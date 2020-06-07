const { path } = require('./utils')
// const path = require('path')
const mode = process._argv.env === 'dev' ? 'dev' : 'pord'
module.exports= {
  apps: {
    admin: {
      version: 2,
      enabled: true,
      port: process._argv.prot || 8082,
      entry: path('./apps/admin'),
      templateDir: path('./apps/admin/template'),
      cacheDir: mode === 'dev' ? __dirname : '/usr/share/nginx/html/',
      minifyHtml: true
    },
    meishi: {
      version: 1,
      enabled: false,
      port: 8083,
      entry: '@/apps/meishi',
      templateDir: '@/apps/admin/template',
      cacheDir: mode === 'dev' ? __dirname : '/usr/share/nginx/html/',
      minifyHtml: true
    }
  },
  databases: {
    web: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456',
      database: 'meituan'
    }
  },
  redis: {
    main: {
      host: 'localhost',
      port: 6379,
      password: undefined
    }
  }
}
