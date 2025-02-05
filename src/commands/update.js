import { loadExpenses, saveExpenses } from '../services/expenses-service.js'

export function updateExpense(id, description, amount, category) {
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
