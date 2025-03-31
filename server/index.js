const path = require('path')
const express = require('express');
const next = require('next');
const connectDB = require('./database')
const handleServerError = require('./helpers/handleServerError')
const list = require('./controllers/user.controller')


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.get('/api/users', list)


server.post('/api/users', (req, res) => {
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
})

server.get('/api/users/:userId', (req, res) => {
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
})

server.put('/api/users/:userId', (req, res) => {
    res.json({ message: 'this is the route to update data for a specific user'})
})

server.delete('/api/users/:userId', (req, res) => {
    res.json({ message: 'this is the route to delete a user'})
})


app.prepare().then(() => {
    server.all('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready at http://localhost:3000');
    });
});


