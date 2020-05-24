const Koa = require('koa')
const { databases } = require('@/config')
const http = require('http')
const mysql = require('promise-mysql')
const __db = require('@/mods/__databases')
module.exports =async function ({ port, entry }) {
  let app = new Koa()
  //创建数据库连接
  for (const name in databases) {
    __db[name] = await mysql.createPool(databases[name])
  }
  app.use(require(entry))
  // app.listen(port, () => {
  //   console.log('server is running: ', port)
  // })
  let httpServer = http.createServer(app.callback())
  httpServer.listen(port, () => {
    console.log('server is running: ', port)
  })
  return httpServer
}
