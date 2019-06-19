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
app.get('/recipes', (req, res) => {
    db.all("SELECT * FROM recipes",
    (err, rows) => {
        if(err){
            res.json(err)
        } else {
            res.json(rows)
        }
    })
})

app.post("/recipes", (req, res) => {
    db.all("INSERT INTO recipes(name, description, minutes_needed) VALUES($name, $description, $minutes_needed)", {
        $name: req.body.name,
        $description: req.body.description,
        $minutes_needed: req.body.minutes_needed,
    }, (err, rows) => {
        if(err) {
            res.status(400).json(err) 
        } else {
            res.status(201).json(rows)
        }
    })
})

app.put("/recipes", (req, res) => {
    db.all("UPDATE recipes SET name = $name, description = $description, minutes_needed = $minutes_needed WHERE id = $id", {
        $id: req.body.id,
        $name: req.body.name,
        $description: req.body.description,
        $minutes_needed: req.body.minutes_needed,
    }, (err, rows) => {
        if(err) {
            res.status(400).json(err) 
        } else {
            res.status(201).json(rows)
        }
    })
})

app.delete("/recipes", (req, res) => {
    db.all("DELETE FROM recipes WHERE id = $id", {
        $id: req.body.id
    }, (err, rows) => {
        if(err) {
            res.status(400).json(err) 
        } else {
            res.status(201).json(rows)
        }
    })
})





// Starting the server
app.listen(port, () => console.log(`App listening on port ${port}!`))