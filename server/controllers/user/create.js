const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')

const create = (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
             error: 'Name and email are required.'
        })
    }

    const db = connectDB()

    const query = `INSERT INTO users (name, email) VALUES (?, ?)`
    const params = [name, email]

    db.run(query, params, (err) => {
        db.close()

        if (err) {
            return handleServerError(res, err, 'Error creating user.')
        }

        return res.json({
            message: `New user ${name} successfully created.`
        })
    })
}

module.exports = create