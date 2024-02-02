let deleteCounter = 0

const sqlite3 = require('sqlite3').verbose();



const db = new sqlite3.Database("./database/db.sqlite", (err) => {if(err) {
  console.log("Error: " + err);
} else {
  db.run("PRAGMA foreign_keys = ON;", (pragmaErr) => {
      if (pragmaErr) {
          console.error("Error enabling foreign keys: ", pragmaErr);
      } 
  });
}})

//Configuring large timeout to give time to the DB to initialize before returning SQLite busy error
const timeoutValue = 10000; 
db.configure('busyTimeout', timeoutValue);

const seed = require('./seed')

function queryWrapper(query, params = []){
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {err ? reject(err) : resolve(rows)});
  });
}

function queryWrapperCreate(query, params = []){
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {      
      err ? reject(err) : resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

async function getTherapists() {
    const query = "SELECT * FROM Therapists";
    try{
      const rows = await queryWrapper(query)
      return rows
    }
    catch(e){
      throw e;
    }
  }

  async function getPatients() {
    const query = "SELECT * FROM Patients";
  
    try{
      const rows = await queryWrapper(query)
      return rows
    }
    catch(e){
      throw e;
    }
  }

  async function getTrainingTypes() {
    const query = "SELECT * FROM Training_types";
  
    try{
      const rows = await queryWrapper(query)
      return rows
    }
    catch(e){
      throw e;
    }
  }
  async function getSessions(patientsIds, therapistsIds, trainingId, startDate, endDate){
    const patientsQuestionMarks = patientsIds.map(id => '?').join(',')
    const therapistsQuestionMarks = therapistsIds.map(id => '?').join(',')

    const query = `
      SELECT Sessions.date,
      Patients.id as patient_id,
      Therapists.id as therapist_id,
      Sessions.training_type_id,       
      Patients.name || ' ' || Patients.surname AS Patient_name,
      Therapists.name || ' ' || Therapists.surname AS Therapist_name,
      Sessions.responses
      FROM Sessions
      INNER JOIN Patients ON Patients.id = Sessions.patient_id
      INNER JOIN Therapists ON Therapists.id = Sessions.therapist_id
      WHERE Sessions.patient_id IN (${patientsQuestionMarks})
      AND Sessions.therapist_id IN (${therapistsQuestionMarks})
      AND Sessions.training_type_id = ?
      AND Sessions.date BETWEEN ? AND ?       
      ORDER BY date`
    const params = [...patientsIds, ...therapistsIds, trainingId, startDate, endDate];
    try{
      const rows = await queryWrapper(query, params)      
      return rows
    }
    catch(e){throw e}
  }

  async function insertRecord(obj){
    deleteCounter++
    console.log(obj)
    const query = `INSERT INTO SESSIONS (patient_id, therapist_id, training_type_id, date, responses) VALUES (?, ?, ?, ?, ?)`
    const params = [obj.patient_id, obj.therapist_id, obj.training_type_id, obj.date, obj.responses]
    
    try{
      const returnValue = await queryWrapperCreate(query, params)
      console.log(`Added record for id ${returnValue.lastID}.`)
      if (deleteCounter == 100){restartCounter()}
      return returnValue
    }
    catch(err) {
      console.log(err)
      throw err}
  }

  function close(){
    db.close()
  }

  //This function is intended to prevent the database from getting too big in 
  //the live demo deployment of the application
  async function restartCounter(){
    const query = `DELETE FROM Sessions WHERE id IN (SELECT id FROM Sessions ORDER BY id DESC LIMIT 10);`
    const returnValue = await queryWrapperCreate(query)
    console.log("Deleting latest values")
    console.log(returnValue)
    deleteCounter = 0;
  }

module.exports = {db, getTherapists, getPatients, getSessions, close, getTrainingTypes, insertRecord}
