const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./api') 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(api)

// app.use(express.static(path.resolve(__dirname, '../dist')))
// app.get('*', function(req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//     res.send(html)
// })

app.listen(3000, () => {
  console.log('app listening on port 3000.')
})