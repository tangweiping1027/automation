let Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-better-body')
const convert = require('koa-convert')
const app = new Koa()

const router = new Router()

app.use(convert(body()))

router.post('/a', async ctx => {
  console.log(ctx.request.fields)
})

app.use(router.routes())

app.listen(8081, () => {
  console.log('监听8081端口')
})
