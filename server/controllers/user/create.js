const connectDB = require('../../database')
const handleServerError = require('../../helpers/handleServerError')
const User = require('../../models/user.model.js')


const create = (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
             error: 'Name and email are required.'
        })
    }

    User.addNewUser({ name: name, email: email}, (err, user) => {
        if (err) {
            return res.json({
                'error': 'there was an error'
            })
        }
        return res.json({
            message: `New user created. Name: ${user.name} Email: ${user.email}`}
        )
    })
}

module.exports = create