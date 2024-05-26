//index.js

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const bcrypt = require("bcryptjs")

app.use(cors())
app.use(express.json())

let port = process.env.PORT || 8080

let mysql = require("mysql");
const { configDotenv } = require('dotenv');
let pool = mysql.createPool({
  connectionLimit : 10,
  host  : 'classmysql.engr.oregonstate.edu',
  user  : process.env.sqlUsername,
  password: process.env.sqlPassword,
  database: 'cs340_chengkai'
});

app.get('/api', (req, res) => {
    res.send("hello from server")
})

app.get('/all-recipes', (req, res) => {
    const sql = `SELECT * FROM recipes`
})

app.get("/login", (req, res) => {  
    console.log("params ==" , req.query)
    const sql = 'SELECT * FROM Website_user WHERE userId = ? LIMIT 1'
    const sqlFormatted = mysql.format(sql, [req.query.username])
    try{
        pool.query(sqlFormatted, (err, result) => {
            // console.log(result)
            const passCheck = bcrypt.compareSync(req.query.password, result[0].password)
            console.log(passCheck)
            if(passCheck){
                res.send(true)
            }
            else{
                res.send(false)
            }
            console.log(result)
            // res.send("hello")
        })
    }
    catch (error){
        console.log(err)
    }
    
})

app.post('/create-account', (req, res) => {
    console.log("body === ", req.body)
    const userId = req.body.username
    const password = req.body.password

    const hash = bcrypt.hashSync(password)

    const sql = `INSERT INTO Website_user (userId, password) VALUES (?,?)`
    const sqlFormatted = mysql.format(sql,[userId,hash])

    try{
        pool.query(sqlFormatted, (err, result) => {
            console.log(result)
            if(result === undefined){
                res.sendStatus(400)
            }
            else{
                res.sendStatus(200)
            }
        })
    }
    catch (error){
        console.log(err)
    }

})

app.post('/create-recipe', (req, res) => {
    console.log("body === ", req.body)

    
    // insert into recipes, ingredients, specialTools, recipe_contains, recipe_uses, recipe_steps
    
    const sql = `INSERT INTO Recipe (cookTime, category, recipeTitle, userID) VALUES (?,?,?,?)`
    const sqlFormatted = mysql.format(sql, [
        req.body.cookTime,
        req.body.category,
        req.body.title,
        req.body.author
    ])
    console.log(sqlFormatted)



    res.sendStatus(200) 
})

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
