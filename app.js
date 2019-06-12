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

// recipes Get Request
app.get('/recipes', (req, res) => {
    db.all("SELECT * FROM recipes",
        [],
        (err, rows) => {
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
    db.run("INSERT INTO recipes(name, description, minutes_needed) VALUES($name, $description, $minutes_needed)", {
        $name: req.body.name,
        $description: req.body.description,
        $minutes_needed: req.body.minutes_needed
    }, (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            db.get("SELECT * FROM recipes WHERE id = (SELECT MAX(id) FROM recipes)", (err, row) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(row)
                }
            })
        }
    })
})

app.delete('/recipes', (req, res) => {
    // const query = db.prepare('DELETE FROM recipes WHERE id = ?')
    db.run("DELETE FROM recipes WHERE id = $id", {
        $id: req.query.id
    }, (err, rows) => {
        if (err) {
            res.json(err)
        } else {
            res.json('Item with id ' + req.query.id + ' succesfully deleted!')
        }
    })
})

app.put('/recipes', (req, res) => {
    db.run("UPDATE recipes SET name = $name, description = $description, minutes_needed = $minutes_needed WHERE id = $id ;", {
            $name: req.body.name,
            $description: req.body.description,
            $minutes_needed: req.body.minutes_needed,
            $id: req.body.id
        },
        (err, rows) => {
            if (err) {
                res.json(err)
            } else {
                db.get("SELECT * FROM recipes WHERE id = $id", {
                    $id: req.body.id
                }, (err, rows) => {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json(rows)
                    }
                })
            }
        }
    )
})
// Starting the server
app.listen(port, () => console.log(`App listening on port ${port}!`))