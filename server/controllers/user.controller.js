const connectDB = require('../database')
const handleServerError = require('../helpers/handleServerError')

const list = (req, res) => {
    const db = connectDB()

    const query = `SELECT * FROM users`

    db.all(query, [], (err, rows) => {
        db.close()

        if (err) {
            return handleServerError(res, err, 'Error retrieving users from the database.')
        }

        if (rows.length === 0) {
            return res.status(404).json({
                error: "No users found."
            })
        }

        return res.send({
            users: rows
        });
    })
}

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

const userByID = (req, res) => {
    const { userId } = req.params

    if (!userId || isNaN(userId)) {
        return res.status(400).json({
            error: "User ID is missing or invalid."
        })
    }

    const db = connectDB()

    const query = `SELECT * FROM users WHERE id = (?)`
    const params = [userId]

    db.get(query, params, (err, row) => {
        db.close()

        if (err) {
            return handleServerError(res, err, 'Error retrieving user data.')
        }

        if (!row) {
            return res.status(404).json({
                error: "User not found."
            })
        }

        return res.json({
            user: row
        })
    })
}


module.exports = { list, create, userByID }