import path from 'node:path'

export const __dirname = path.resolve(path.join('data'))

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
}
