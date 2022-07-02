const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const dbFile = "./data/chat_db.db";
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
  /////MESSAGES/////////////////////////////////////////
  const messStmt = `CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message VARCHAR (255),
    user VARCHAR (255),
    room VARCHAR (255),
    time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `;
  //if (!exists) {
  db.run(messStmt, (error) => {
    if (error) {}
  });
  /////USERS/////////////////////////////////////////
  const usersStmt = `CREATE TABLE users (
    count INTEGER PRIMARY KEY AUTOINCREMENT,
    id VARCHAR (255),
    name VARCHAR (255),
    room VARCHAR (255)
  )
  `;
  db.run(usersStmt, (error) => {
    if (error) {}
  });
  /////ROOMS/////////////////////////////////////////
  const roomStmt = `CREATE TABLE room (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR (255),
    password CHAR (60) DEFAULT NULL
  )
  `;

  db.run(roomStmt, (error) => {
    if (error) {} else {
      const insertRoom = `INSERT INTO room (
        name
        ) VALUES (?)`;
      db.run(insertRoom, ["General"]);
    }
  });
});

module.exports = db;