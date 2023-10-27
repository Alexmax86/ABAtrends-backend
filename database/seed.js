const sqlite3 = require('sqlite3').verbose();
const dbManager = require ('./dbmanager')
const therapists = require('./data/therapists')
const patients = require('./data/patients')
const db = new sqlite3.Database("./database/db.sqlite", (err) => {if(err){console.log("Error: " + err)}})
const sessions = require('./data/sessions')




db.serialize(() => {
    //THERAPISTS TABLE
   db.run(`DROP TABLE IF EXISTS Therapists`)

    db.run(`CREATE TABLE Therapists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        email TEXT UNIQUE,
        age INTEGER
    );`);

    therapists.map(t => {
        db.run(`INSERT INTO Therapists (name, surname, email, age) VALUES (?, ?, ?, ?)`, [t.name, t.surname, t.email, t.age])
    })

    //PATIENTS TABLE
    db.run(`DROP TABLE IF EXISTS Patients`)

    db.run(`CREATE TABLE Patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        email TEXT UNIQUE,
        age INTEGER
    );`);

    patients.map(t => {
        db.run(`INSERT INTO Patients (name, surname, email, age) VALUES (?, ?, ?, ?)`, [t.name, t.surname, t.email, t.age])
    })

    //SESSIONS TABLE
    db.run(`DROP TABLE IF EXISTS Sessions`)

    db.run(`CREATE TABLE Sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        therapist_id INTEGER,
        patient_id INTEGER,
        date DATE,
        responses INTEGER
    );`);

    sessions.map(t => {
        db.run(`INSERT INTO Sessions (therapist_id, patient_id, date, responses) VALUES (?, ?, ?, ?)`, [t.therapist_id, t.patient_id, t.date, t.responses])
    })
    })

    

    