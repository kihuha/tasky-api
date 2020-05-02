const REQUIRED = ['completed', 'title']

const newTask = (body) => {
    const allErrors = []

    // 1. CONFIRM THAT FIELDS ARE VALID
    fields = Object.keys(body)
    const status = fields.every(
        (field) => REQUIRED.includes(field)
    )

    !status && allErrors.push({"fieldError": "Only " + REQUIRED.join(',').toUpperCase() + " are allowed"})

    // 2. CONFIRM THE DATA TYPES
    typeof body.title !== 'string' && allErrors.push({"fieldError": "title should be of type STRING"})
    typeof body.completed !== 'boolean' && allErrors.push({"fieldError": "completed should be of type BOOLEAN"})


    return allErrors.length === 0
        ? [true, {}]
        : [false, allErrors]
}

const updateTask = (body) => {
    const allErrors = []

    // 1. CONFIRM THAT FIELDS ARE VALID
    fields = Object.keys(body)
    const status = fields.every(
        (field) => REQUIRED.includes(field)
    )

    !status && allErrors.push({"fieldError": "Only " + REQUIRED.join(',').toUpperCase() + " are allowed"})

    // 2. CONFIRM THE DATA TYPES
    keys = Object.keys(body)
    keys.indexOf('title') >= 0  && (typeof body.title !== 'string' && allErrors.push({"fieldError": "title should be of type STRING"}))
    keys.indexOf('completed') >= 0 && (typeof body.completed !== 'boolean' && allErrors.push({"fieldError": "completed should be of type BOOLEAN"}))


    return allErrors.length === 0
        ? [true, {}]
        : [false, allErrors]
}

module.exports = {
    newTask,
    updateTask
}