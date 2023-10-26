const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database/db.sqlite", (err) => {if(err){console.log("Error: " + err)}})

function queryWrapper(query){
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getTherapists() {
    const query = "SELECT * FROM Therapists";
  
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }



module.exports = {getTherapists}
