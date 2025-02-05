import Table from 'cli-table'
import { loadExpenses } from '../services/expenses-service.js'
import { formatDate, formatValueToBRL } from '../utils.js'

export function showSummary(month) {
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
