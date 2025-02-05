import fs from 'node:fs'
import path from 'node:path'
import { program } from 'commander'
import Table from 'cli-table'
import { formatDate, formatValueToBRL } from './src/utils.js'

const DATA_DIR = 'data'
const FILE_PATH = path.join(DATA_DIR, 'expenses.json')

function loadExpenses() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR)
    }

    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '[]')
    }

    const data = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(data)
}

function saveExpenses(expenses) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2))
}

function addExpense(description, amount, category = 'Uncategorized') {
    const expenses = loadExpenses()
    const expense = {
        id: expenses.length + 1,
        date: new Date(),
        description,
        amount: Number.parseFloat(amount),
        category
    }
    expenses.push(expense)
    saveExpenses(expenses)
    console.log('Expense added successfully.')
}

function updateExpense(id, description, amount, category) {
    const expenses = loadExpenses()
    const expense = expenses.find(e => e.id === +id)

    if (!expense) {
        console.log('Expense not found.')
        return
    }

    expense.description = description ?? expense.description
    expense.amount = amount ?? expense.amount
    expense.category = category ?? expense.category
    saveExpenses(expenses)
    console.log('Expense updated successfully.')
}

function deleteExpense(id) {
    let expenses = loadExpenses()
    expenses = expenses.filter(e => e.id !== +id)
    saveExpenses(expenses)
    console.log('Expense deleted successfully.')
}

function listExpenses() {
    const expenses = loadExpenses()

    if (expenses.length === 0) {
        console.log('No expenses found.')
        return
    }

    const table = new Table({
        head: ['ID', 'Date', 'Description', 'Amount', 'Category']
    })

    for (const expense of expenses) {
        table.push([
            expense.id,
            formatDate(expense.date),
            expense.description,
            formatValueToBRL(expense.amount),
            expense.category
        ])
    }

    console.log(table.toString())
}

function showSummary(month) {
    const expenses = loadExpenses()
    let filteredExpenses = expenses
    let total = 0
    const currentDate = new Date()
    currentDate.setMonth(month - 1)
    const currentMonth = currentDate.toLocaleDateString('pt-BR', { month: 'long' })

    if (month)
        filteredExpenses = expenses.filter(exp => new Date(exp.date).getMonth() + 1 === +month)

    const table = new Table({
        head: ['ID', 'Date', 'Description', 'Amount', 'Category']
    })

    for (const exp of filteredExpenses) {
        total += exp.amount
        table.push([
            exp.id,
            formatDate(exp.date),
            exp.description,
            formatValueToBRL(exp.amount),
            exp.category
        ])
    }

    console.log(table.toString())
    console.log(`O total de despesas para o mês ${currentMonth} foi de R$ ${total}.`)
}

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <string>', 'Description of the expense')
    .requiredOption('--amount <number>', 'Amount of the expense')
    .option('--category <string>', 'Category of the expense', 'Uncategorized')
    .action(opts => addExpense(opts.description, opts.amount, opts.category))

program
    .command('update')
    .description('Update an existing expense')
    .requiredOption('--id <number>', 'ID of the expense to update')
    .option('--description <string>', 'New description of the expense')
    .option('--amount <number>', 'New amount of the expense')
    .option('--category <string>', 'New category of the expense')
    .action(opts => updateExpense(opts.id, opts.description, opts.amount, opts.category))

program
    .command('delete')
    .description('Delete expense')
    .requiredOption('--id <number>', 'ID of the expense to delete')
    .action(opts => deleteExpense(opts.id))

program.command('list').description('List all expenses').action(listExpenses)

program
    .command('summary')
    .description('Show summary of all expenses')
    .option('--month <number> [1-12]')
    .action(opts => showSummary(opts.month))

program.parse(process.argv)
