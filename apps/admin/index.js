const Router = require('koa-router')
const User = require('../../models/user')
const { main } = require('@/mods/__redis')

const router = new Router()

router.get('/a', async ctx => {
  // ctx.body = await User.getUserById('1449c463b5b94ce69c433feb391a2e59')
  await main.setAsync('name', 'blue')
  ctx.body = '设置成功'
})

router.get('/b', async ctx => {
  ctx.body = await main.getAsync('name')
})

router.get('/c', async ctx => {
  if (!ctx.session.count) {
    ctx.session.count = 0
  }

  ctx.session.count++

  ctx.body =`欢迎你第${ctx.session.count}次访问本站`
})

router.get('/d', async ctx => {
  await ctx.render('index', {
    name: '小芳',
    age: 18,
    arr: [1,2,3,4]
  })

  await ctx.writeCache('index', ctx.body)

})

module.exports = router.routes()
