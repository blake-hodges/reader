const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')

const update = (req, res) => {
    const { userId } = req.params

    if (!userId || isNaN(userId)) {
        return res.status(400).json({
            error: "User ID is missing or invalid."
        })
    }

    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required.'
        })
    }

    const db = connectDB()

    const getQuery = `SELECT * FROM users WHERE id = (?)`
    const getParams = [userId]

    db.get(getQuery, getParams, (err, row) => {
        if (err) {
            db.close()
            return handleServerError(res, err, 'Error getting user data.')
        }

        if (!row) {
            db.close()
            return res.status(404).json({
                error: `User with ID ${userId} not found in database.`
            })
        }

        const updateQuery = `UPDATE users SET name = (?), email = (?) WHERE id = (?)`
        const updateParams = [name, email, userId]

        db.run(updateQuery, updateParams, (err) => {
            if (err) {
                return handleServerError(res, err, 'Error updating user.')
            }
            return res.json({
                message: `User with ID ${userId} successfully updated.`
            })
        })
    })
}

module.exports = update