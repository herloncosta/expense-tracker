import fs from 'node:fs'
import path from 'node:path'
import { program } from 'commander'
import { __dirname, formatDate } from './src/utils.js'

const EXPENSES_FILE_PATH = path.join(__dirname, 'expenses.json')

function loadExpenses() {
    if (fs.existsSync(EXPENSES_FILE_PATH)) {
        const data = fs.readFileSync(EXPENSES_FILE_PATH, 'utf-8')
        return JSON.parse(data)
    }
    return []
}

function saveExpenses(expenses) {
    fs.writeFileSync(EXPENSES_FILE_PATH, JSON.stringify(expenses, null, 2))
}

function addExpense(description, amount, category = 'Uncategorized') {
    const expenses = loadExpenses()
    const expense = {
        id: expenses.length + 1,
        date: formatDate(new Date()),
        description,
        amount: parseFloat(amount),
        category
    }
    expenses.push(expense)
    saveExpenses(expenses)
    console.log('Expense added successfully.')
}

function updateExpense(id, description, amount, category) {
    const expenses = loadExpenses()
    const expense = expenses.find(e => e.id == id)

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
    expenses = expenses.filter(e => e.id != id)
    saveExpenses(expenses)
    console.log('Expense deleted successfully.')
}

program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <string>', 'Description of the expense')
    .requiredOption('--amount <number>', 'Amount of the expense')
    .option('--category <string>', 'Category of the expense', 'Uncategorized')
    .action(opt => addExpense(opt.description, opt.amount, opt.category))

program
    .command('update')
    .description('Update an existing expense')
    .requiredOption('--id <number>', 'ID of the expense to update')
    .option('--description <string>', 'New description of the expense')
    .option('--amount <number>', 'New amount of the expense')
    .option('--category <string>', 'New category of the expense')
    .action(opt => updateExpense(opt.id, opt.description, opt.amount, opt.category))

program
    .command('delete')
    .description('Delete expense')
    .requiredOption('--id <number>', 'ID of the expense to delete')
    .action(opt => deleteExpense(opt.id))

program.parse(process.argv)
