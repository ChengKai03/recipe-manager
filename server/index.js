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
  // let sql = `SELECT * FROM STUDENT`
  // try{
  //   pool.query(sql, (err, result) => {
  //     if(result){
  //      res.send(result)
  //     }
  //     else{
  //       res.send("NO DATA")
  //     }
  //    
  //   })
  // } catch(error) {
  //
  //   console.log(err)
  // }
    res.send("hello from server")
})

app.get('/all-recipes', (req, res) => {
    const sql = `SELECT * FROM recipes`
})

app.get("/login", (req, res) => {  
    console.log("params ==" , req.query)
    const sql = 'SELECT * FROM Website_user WHERE username = ? LIMIT 1'
    const sqlFormatted = mysql.format(sql, [req.query.username])
    try{
        pool.query(sqlFormatted, (err, result) => {
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



app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
