//index.js

const express = require('express');
const app = express();
const cors = require('cors');

let port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
      res.json({message: 'Hello from our server!'})
})

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
