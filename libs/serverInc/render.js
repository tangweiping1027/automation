const ejs = require('koa-ejs')
const minify = require('html-minifier').minify
const path = require('path')
const fs = require('promise-fs')

module.exports = async function render(app) {
  ejs(app, {
    root: app.config.templateDir,
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
  })

  if (app.config.minifyHtml) {
    const render = app.context.render
    app.context.render = async function (...ags) {
      await render.call(this, ...ags)

      if (!this.body) return
      this.body = minify(this.body, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      })
    }
  }


  // 写入静态文件
  app.context.writeCache = async function (name, content) {
    let filePath = path.resolve(app.config.cacheDir, name)
    fs.writeFile(filePath, content)
  }

}
