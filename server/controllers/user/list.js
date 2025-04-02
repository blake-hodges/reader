const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')

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

module.exports = list