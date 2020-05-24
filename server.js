require('module-alias/register')
const { myRequire } = require('./libs/common')
const path = require('path')
let config = require('./config')
const cluster = require('cluster')
const server = require('./libs/server')




if (cluster.isMaster) {
  setInterval(() => {
    let newConfig = myRequire(path.resolve(__dirname, 'config.js'))

    for (const name in newConfig.apps) {
      let newApp = newConfig.apps[name]
      let oldApp = config.apps[name]
      if (newApp.version !== oldApp.version) {
        newApp.name = name
        // 启动新进程
        newApp.worker = createWorker(newApp)

        // 通知老进程
        oldApp.worker.send('close new connection')

        config.apps[name] = newConfig.apps[name]
      }

    }


  }, 1000)

  function createWorker(app) {

    if (!app.enabled) return
    // worker === child process
    const worker = cluster.fork()

    worker.on('exit', code => {
      console.log('子进程退出了', code);
      if (code) {
        // 重启子进程
        setTimeout(function () {
          createWorker(app)
        }, 1000)
      }

    })

    console.log('新得进程', app.name, app.version)
    worker.send(app)
    return worker
  }

  console.log('主进程启动了')

  for (const name in config.apps) {
    const app = config.apps[name]
    app.name = name
    app.worker = createWorker(app)
  }

} else {
  let httpd;
  process.on('message', async config => {
    if (config === 'close new connection') {
      httpd.close(() => {
        console.log('老进程退出了')
        process.exit(0)
      })
    } else {
      httpd = await server(config)
    }

  })
}


