const mysql=require('promise-mysql');
(async () => {
  let db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meituan'
  })

  await db.query('SET autocommit=0;');
  await db.query('START TRANSACTION;')

  try {
    await db.query('UPDATE banner_table SET title=? WHERE ID=?', ['12','396da7aa468c48fe98d44f30115b042f'])
    await db.query('COMMIT')
  } catch (e) {
    await db.query('ROLLBACK')
  }

  console.log('完成')

})()
