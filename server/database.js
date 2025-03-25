const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const dbPath = path.resolve(__dirname, "../reader.db")


function connectDB() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("There was a problem connecting to the database: ", err.message)
        } else {
            console.log("database connection successful")
        }
    })
    return db
}


module.exports = connectDB