const mysql = require("mysql2");

let db = null;
class DB {
  constructor() {
    db = mysql.createConnection({
      host: "ihome.eekeyun.com",
      user: "peiyihui",
      password: "peiyihui",
      database: "peiyihui_local",
    });
    db.connect(function (err) {
      if (err) console.log(err);
    });
  }

  addUser(data) {
    return new Promise(async (resolve, reject) => {
      if (await this.isUserExist(data)) {
        resolve(true);
      } else
        db.execute(
          "INSERT INTO im_users (name, user_id) VALUES (?,?)",
          [data.name, data.user_id],
          function (err, rows) {
            if (err) reject(new Error(err));
            else resolve(rows);
          }
        );
    });
  }
  isUserExist(data) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT * FROM im_users WHERE name = ?",
        [data.name],
        function (err, rows) {
          if (err) reject(new Error(err));
          else resolve(rows[0]);
        }
      );
    });
  }
  fetchUserMessages(data) {
    const messages = [];
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * from im_messages where name =?",
        [data.name],
        function (err, rows) {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
  storeUserMessage(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO im_messages (message, user_id, name) VALUES (?,?,?)",
        [data.message, data.user_id, data.name],
        function (err, rows) {
          if (err) reject(new Error(err));
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = DB;
