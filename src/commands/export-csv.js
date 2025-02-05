import { createObjectCsvWriter } from 'csv-writer'
import { loadExpenses } from '../services/expenses-service.js'

export function exportToCSV() {
    const expenses = loadExpenses()

    if (expenses.length === 0) {
        console.log('No expenses found.')
        return
    }

    const csvWriter = createObjectCsvWriter({
        path: 'expenses.csv',
        header: [
            { id: 'id', title: 'ID' },
            { id: 'date', title: 'Date' },
            { id: 'description', title: 'Description' },
            { id: 'amount', title: 'Amount' },
            { id: 'category', title: 'Category' }
        ]
    })

    csvWriter
        .writeRecords(expenses)
        .then(() => console.log('Expenses exported to CSV successfully.'))
        .catch(error => console.error('Error exporting expenses to CSV:', error))
}
