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

  async function getSessions(patientsIds, therapistsIds, startDate, endDate){
    const patientsQuestionMarks = patientsIds.map(id => '?').join(',')
    const therapistsQuestionMarks = therapistsIds.map(id => '?').join(',')

    const query = `
      SELECT Sessions.date,
      Patients.id as patient_id,
      Therapists.id as therapist_id, 
      Patients.name || ' ' || Patients.surname AS Patient_name,
      Therapists.name || ' ' || Therapists.surname AS Therapist_name,
      Sessions.responses
      FROM Sessions
      INNER JOIN Patients ON Patients.id = Sessions.patient_id
      INNER JOIN Therapists ON Therapists.id = Sessions.therapist_id
      WHERE Sessions.patient_id IN (${patientsQuestionMarks})
      AND Sessions.therapist_id IN (${therapistsQuestionMarks})
      AND Sessions.date BETWEEN ? AND ?       
      ORDER BY date`
    const params = [...patientsIds, ...therapistsIds, startDate, endDate];
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
