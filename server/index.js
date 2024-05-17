//index.js

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors())
app.use(express.json())

let port = process.env.PORT || 8080

let mysql = require('mysql');
const { configDotenv } = require('dotenv');
let pool = mysql.createPool({
  connectionLimit : 10,
  host  : 'classmysql.engr.oregonstate.edu',
  user  : process.env.sqlUsername,
  password: process.env.sqlPassword,
  database: 'cs340_chengkai'
});

app.get('/api', (req, res) => {
      let sql = `SELECT * FROM STUDENT`
      pool.query(sql, (err, result) => {
            if(err){
                  console.log(err)
                  throw err
            }
            console.log(result)
            res.send(result)
      })
      
})

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
