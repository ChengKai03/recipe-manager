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
  try{
    pool.query(sql, (err, result) => {
      if(result){
       res.send(result)
      }
      else{
        res.send("NO DATA")
      }
     
    })
  } catch(error) {

    console.log(err)
  }
})

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
