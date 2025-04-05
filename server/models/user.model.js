const connectDB = require('../database')


class User {
    constructor(data) {
        this.name = data.name
        this.email = data.email
    }
    static addNewUser({ name, email }, callback) {
        const db = connectDB()

        const query = `INSERT INTO users (name, email) VALUES (?, ?)`
        const params = [name, email]

        db.run(query, params, (err) => {
            db.close()
            if (err) {
                return callback(err)
            }
            return callback(null, new User({ name, email }))
        })
    }
}

module.exports = User