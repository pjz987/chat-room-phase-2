const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

async function openDb () {
  const db = await open({
    filename: 'messages.sqlite3',
    driver: sqlite3.Database
  })
  const result = await db.all('SELECT username, text, room, date FROM messages')

  return result
}

async function writeDb (username, text, room) {
  console.log({ username, text, room })
  const db = await open({
    filename: 'messages.sqlite3',
    driver: sqlite3.Database
  })
  await db.run(
    'INSERT INTO messages (username, text, room, date) VALUES ($username, $text, $room, $date)',
    {
      $username: username,
      $text: text,
      $room: room,
      $date: new Date().toISOString()
    }
  )
  const result = await db.all('SELECT username, text, room, date FROM messages')

  return result
}

module.exports = {
  openDb,
  writeDb
}
