const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database/db.sqlite", (err) => {if(err){console.log("Error: " + err)}})
const seed = require('./seed')




function queryWrapper(query, params = []){
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {err ? reject(err) : resolve(rows)});
  });
}

async function getTherapists() {
    const query = "SELECT * FROM Therapists";
    try{
      const rows = await queryWrapper(query)
      return rows
    }
    catch(e){
      return e;
    }
  }

  async function getPatients() {
    const query = "SELECT * FROM Patients";
  
    try{
      const rows = await queryWrapper(query)
      return rows
    }
    catch(e){
      return e;
    }
  }

  async function getSessions(id, startDate, endDate){
    const query = `SELECT * FROM Sessions WHERE patient_id IN (${id.map(id => '?').join(',')}) AND date BETWEEN ? AND ? ORDER BY date`    
    const params = [...id, startDate, endDate];
    try{
      const rows = await queryWrapper(query, params)      
      return rows
    }
    catch(e){return e}
  }

  function close(){
    db.close()
  }



module.exports = {db, getTherapists, getPatients, getSessions, close}
