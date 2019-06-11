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
    res.json({'hello':'world'})
})

// recipes Get Request
app.get('/recipes', (req, res) => {
    // variable with valid sql query
    let query = 'SELECT * FROM recipes;'
    // use variable for query
    db.all(query, [], (err, rows) => {
        // In case the query fails
        if (err) {
            res.json(err)
        // in case the query works good
        } else {
            res.json(rows)
        }
    })
})

// recipes post request
app.post('/recipes', (req, res) => {
    // preparing the query (?=wildcard, will be filled with req.body in case the request is succesful)
    const query = db.prepare('INSERT INTO recipes(name, description, minutes_needed) VALUES(?,?,?)')
    query.run(req.body.name, req.body.description, req.body.minutes_needed, (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            db.get('SELECT * FROM recipes WHERE id = (SELECT MAX(id) FROM recipes)', (err, row) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(row)
                }
            })
        }
    })
})

app.delete('/recipes/:id', (req, res) => {
    const query = db.prepare('DELETE FROM recipes WHERE id = ?')
    query.run(req.params.id, (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            res.json('Item with id' + req.params.id + 'succesfull deleted!')
        }
    })
})

app.put('/recipes')
// Starting the server
app.listen(port, ()=> console.log(`App listening on port ${port}!`))