

const getNotes = (request, response) => {
    pool.query('SELECT * FROM notes ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log("error")
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNoteById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM notes WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log("error")
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createNote = (request, response) => {
    const body = request.body

    pool.query('INSERT INTO notes (body) VALUES ($1)', [body], (error, results) => {
        if (error) {
            console.log("error")
            throw error
        }
        respose.status(201).send(`Note added with ID: ${result.insertId}`)
    })
}

const updateNote = (request, response) => {
    const id = parseInt(request.params.id)
    const body = request.body

    pool.query(
        'UPDATE notes SET body = $1 WHERE id = $2',
        [body, id],
        (error, results) => {
            if (error){
                console.log("error")
                throw error
            }
            response.status(200).send(`Note modified with ID: ${id}`)
        }
    )
}

const deleteNote = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM notes WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log("error")
            throw error
        }
        response.status(200).send(`Note deleted with ID ${id}`)
    })
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
}