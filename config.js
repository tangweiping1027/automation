// const { path } = require('./utils')
const path = require('path')
module.exports= {

  apps: {
    admin: {
      version: 1,
      enabled: true,
      port: 8082,
      entry: '@/apps/admin'
    },
    meishi: {
      version: 1,
      enabled: false,
      port: 8083,
      entry: '@/apps/meishi'
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
  }
}
