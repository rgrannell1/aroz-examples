
// -- semicolons are GENUINELY OPTIONAL, with a handful of very rare exceptions
// -- always use strict too, prevents some dumb errors
'use strict'

process.on('unhandledRejection', err => {
  throw err
})

const sqlite = require('sqlite')


const main = async () => {
  const db = await sqlite.open('./database.sqlite');

  await db.run("CREATE TABLE IF NOT EXISTS test_data (content TEXT)");
  await db.exec("INSERT INTO test_data (content) VALUES ('hey')")

  const res = await db.all('SELECT * FROM test_data')

  console.log(res)
}

main()
