const express = require('express');
const next = require('next');
const connectDB = require('./database')


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.get('/api/users', (req, res) => {
    const db = connectDB()

    const query = `SELECT * FROM users`
    const params = []

    db.all(query, params, (err, rows) => {
        db.close()
        if (err) {
            const errorMessage = `[ERROR] ${new Date().toISOString()}: ${err.message}`
            console.error(errorMessage)
            return res.status(500).json({ message: 'Error retrieving users from the database' })
        }

        res.send({ users: rows });
    })
});

server.post('/api/users', (req, res) => {
    res.json({ message: 'this is the route to create a new user'})
})

server.get('/api/users/:userId', (req, res) => {
    res.json({ message: 'this is the route to get a user by id'})
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


