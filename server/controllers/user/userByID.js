const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')

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

module.exports = userByID