const express = require('express')
const app = express()


app.use(require('cors')())
app.use(express.json())

app.use('/uploads', express.static(__dirname + '/uploads'))

require('./utils/db')(app)
require('./route/admin')(app)
require('./route/web')(app)

app.listen(3000, () => {
  console.log('服务器启动在3000端口')
})