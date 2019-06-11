// this script auto migrates the database. For changes on database change db.sql!
const sqlite3 = require('sqlite3').verbose()
var fs = require('fs')
var readline = require('readline')

const db = new sqlite3.Database('recipes.sqlite')

var rl = readline.createInterface({
    input: fs.createReadStream('./db/db.sql'),
    terminal: false
})
rl.on('line',(chunk) => {
    db.serialize(() => {
        db.run(chunk.toString('ascii'),(err, sets, fields) => {
            if (err) console.log(err)
        })
    })
})

rl.on('close',() => {
    console.log("finished")
    db.close()
})
