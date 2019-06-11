// this script auto seeds the database. For changes on seeds change seeds.sql!
const sqlite3 = require('sqlite3').verbose()
var fs = require('fs')
var readline = require('readline')

const db = new sqlite3.Database('recipes.sqlite')

var rl = readline.createInterface({
    input: fs.createReadStream('./db/seed.sql'),
    terminal: false
})
rl.on('line',  (chunk) => {
    db.serialize(() => {
        db.run(chunk.toString('ascii'),  (err, sets, fields) => {
            if (err) console.log(err)
        })
    })
})

rl.on('close',  () => {
    console.log("finished")
    db.close()
})
