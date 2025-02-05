import Table from 'cli-table'
import { loadExpenses } from '../services/expenses-service.js'
import { formatDate, formatValueToBRL } from '../utils.js'

export function listExpenses(category) {
    const expenses = loadExpenses()
    let filteredExpenses = expenses

    if (category) {
        filteredExpenses = expenses.filter(e => e.category === category)
    }

    if (expenses.length === 0) {
        console.log('No expenses found.')
        return
    }

    const table = new Table({
        head: ['ID', 'Date', 'Description', 'Amount', 'Category']
    })

    for (const expense of filteredExpenses) {
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
