const path = require('path')
const express = require('express');
const next = require('next');
const connectDB = require('./database')
const handleServerError = require('./helpers/handleServerError')
const { list, create, userByID, remove, update } = require('./controllers/user.controller')


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.get('/api/users', list)

server.post('/api/users', create)

server.get('/api/users/:userId', userByID)

server.put('/api/users/:userId', update)

server.delete('/api/users/:userId', remove)


app.prepare().then(() => {
    server.all('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('Server ready at http://localhost:3000');
    });
});


