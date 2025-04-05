const path = require('path')
const express = require('express');
const connectDB = require('./database')
const handleServerError = require('./helpers/handleServerError')
const { list, create, userByID, remove, update } = require('./controllers/user.controller')


// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/users', list)

app.post('/api/users', create)

app.get('/api/users/:userId', userByID)

app.put('/api/users/:userId', update)

app.delete('/api/users/:userId', remove)

app.listen(3022, (err) => {
    if (err) {
        throw err
    }
    console.log('Server ready at http://localhost:3022');
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// app.prepare().then(() => {
//     server.all('*', (req, res) => handle(req, res));

//     server.listen(3000, (err) => {
//         if (err) throw err;
//         console.log('Server ready at http://localhost:3000');
//     });
// });


