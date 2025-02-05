import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = 'data'
const FILE_PATH = path.join(DATA_DIR, 'expenses.json')

export function loadExpenses() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR)
    }

    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '[]')
    }

    const data = fs.readFileSync(FILE_PATH, 'utf-8')
    return JSON.parse(data)
}

export function saveExpenses(expenses) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2))
}
