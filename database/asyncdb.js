const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

let db;

program()
async function program(){
  db = await sqlite.open({
    filename: '/database/db.sqlite',
    driver: sqlite3.Database
  })
  console.log(JSON.stringify(db))
  const therapists = await db.all('SELECT * FROM Therapists');
  console.log(therapists)
  
}




async function connect(){
  db = await new sqlite.Database('./db.sqlite', (err) => {if(err){console.log("DB error")}})
}


async function getTherapists(){
  console.log("GetTherapist function")
    try {      
      const therapists = await dba.all('SELECT * FROM Therapists');
      return therapists
    } catch (error) {
      console.error(error);
    }
  }

module.exports = {getTherapists}