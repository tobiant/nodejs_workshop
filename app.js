// Express app
const express = require('express')
const app = express()
const port = 3000

// Database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('recipes.sqlite')

// Middleware for JSON format I/O
app.use(express.json())

// helloworld Get Request
app.get('/helloworld', (req, res) => {
    res.json({
        'hello': 'world'
    })
})

// Starting the server
app.listen(port, () => console.log(`App listening on port ${port}!`))