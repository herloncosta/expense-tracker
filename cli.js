import { program } from 'commander'
import { addExpense } from './src/commands/add.js'
import { updateExpense } from './src/commands/update.js'
import { deleteExpense } from './src/commands/delete.js'
import { listExpenses } from './src/commands/list.js'
import { showSummary } from './src/commands/summary.js'
import { exportToCSV } from './src/commands/export-csv.js'

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

program
    .command('list')
    .description('List all expenses')
    .option('--category <string>')
    .action(opts => listExpenses(opts.category))

program
    .command('summary')
    .description('Show summary of all expenses')
    .option('--month <number> [1-12]')
    .action(opts => showSummary(opts.month))

program.command('export').description('Export expenses to CSV file.').action(exportToCSV)

program.parse(process.argv)
