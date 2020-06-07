const config = require('@/config')
const mysql = require('promise-mysql')
const __db = require('@/mods/__databases')

module.exports = async function () {
  for (const name in config.databases) {
    let db = await mysql.createPool(config.databases[name])
    await db.query(`SHOW TABLES`)
    __db[name] = db
  }
}
