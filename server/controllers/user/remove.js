const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')

const remove = (req, res) => {
    const { userId } = req.params

    if (!userId || isNaN(userId)) {
        return res.status(400).json({
            error: "User ID is missing or invalid."
        })
    }

    const db = connectDB()

    const getQuery = `SELECT * FROM users WHERE id = (?)`
    const params = [userId]

    db.get(getQuery, params, (err, row) => {

        if (err) {
            db.close()
            return handleServerError(res, err, 'Error fetching user data.')
        }

        if (!row) {
            db.close()
            return res.status(404).json({
                error: `User with ID ${userId} not found in database.`
            })
        }

        const deleteQuery = `DELETE FROM users WHERE id = (?)`
        db.run(deleteQuery, params, (err) => {
            db.close()

            if (err) {
                return handleServerError(res, err, 'Error removing user.')
            }

            return res.json({
                message: `User with ID ${userId} successfully deleted.`
            })
        })
    })
}

module.exports = remove