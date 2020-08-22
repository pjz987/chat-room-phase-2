const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function openDb () {
  const db = await open({
    filename: 'messages',
    driver: sqlite3.Database
  })
  const result = await db.all('SELECT text, username, date FROM messages')

  return result
}

// console.log(openDb())
openDb().then(data => console.log(data[1].text))
// openDb().then(db => {
//   const result = await db.all('SELECT col FROM tbl')
//   console.log(result)
// })

async function writeDb (username, text, room) {
  const db = await open({
    filename: 'messages',
    driver: sqlite3.Database
  })
  await db.run(
    // `INSERT INTO messages (text, username, date) VALUES (${text}, ${username}, ${new Date().toString()})`,
    'INSERT INTO messages (text, username, date) VALUES ($text, $username, $date)',
    {
      $text: text,
      $username: username,
      $date: new Date().toString()
    }
  )
  const result = await db.all('SELECT text, username, date FROM messages')

  return result
  // return db
  // openDb().then(data => console.log(data))
}

writeDb('user mcuserface', 'i like jokes').then(data => console.log(data))
