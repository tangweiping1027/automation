const __db = require('@/mods/__databases')
async function getUserById(id) {
  let rows = await __db.web.query(`SELECT * FROM user_table WHERE ID=?`, [id])
  return rows[0]
}
async function getUerByName(db, name) {

}
async function getUserList() {}

module.exports = {
  getUserById,
  getUerByName,
  getUserList
}
