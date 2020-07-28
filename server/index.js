const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log('服务器启动在3000端口')
})