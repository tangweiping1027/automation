const Koa = require('koa')
const http = require('http')

module.exports =async function (config) {
  const app = new Koa()
  app.config = app.context.config = config
  //创建数据库连接
  await require('@/libs/serverInc/database')()

  //创建redis连接
  await require('@/libs/serverInc/redis')()

  //创建session
  await require('@/libs/serverInc/session')(app)

  // 渲染
  await require('@/libs/serverInc/render')(app)
  // 路由入口文件引入
  app.use(require(config.entry))
  // app.listen(port, () => {
  //   console.log('server is running: ', port)
  // })
  let httpServer = http.createServer(app.callback())
  httpServer.listen(config.port, () => {
    console.log('server is running: ', config.port)
  })
  return httpServer
}
