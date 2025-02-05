import { loadExpenses, saveExpenses } from '../services/expenses-service.js'

export function addExpense(description, amount, category = 'Uncategorized') {
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
