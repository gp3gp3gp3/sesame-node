var express = require('express')
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/audio', function (req, res) {
  res.sendFile(path.join(__dirname, '/audio.html'))
})

app.get('/iframe', function (req, res) {
  res.sendFile(path.join(__dirname, '/iframe.html'))
})

app.get('/parsecsv', function (req, res) {
  res.sendFile(path.join(__dirname, '/parsecsv.html'))
})

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})
