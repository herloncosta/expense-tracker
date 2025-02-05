import { loadExpenses, saveExpenses } from '../services/expenses-service.js'

export function deleteExpense(id) {
    let expenses = loadExpenses()
    expenses = expenses.filter(e => e.id !== +id)
    saveExpenses(expenses)
    console.log('Expense deleted successfully.')
}
