const http = require('http')
const Koa = require('koa')

let app = new Koa()
let httpServer = http.createServer(app.callback())

httpServer.listen(8000)

setTimeout(() => {
  console.log('开始close')
  httpServer.close(() => {
    console.log('结束')
  })
}, 5000)
