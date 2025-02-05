export const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString(undefined, options)
}

export const formatValueToBRL = value =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
