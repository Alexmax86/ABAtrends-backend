const dbManager = require ('./dbmanager')
const therapists = require('./data/therapists')
const db = dbManager.db;



db.serialize(() => {
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
})



