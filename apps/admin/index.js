const Router = require('koa-router')
const User = require('../../models/user')

const router = new Router()

router.get('/a', async ctx => {
  // ctx.body = await User.getUserById('1449c463b5b94ce69c433feb391a2e59')
  ctx.body = 2
})


module.exports = router.routes()
