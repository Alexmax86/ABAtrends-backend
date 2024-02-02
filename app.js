const express = require('express')
const path = require('path');
const app = express()

const dbManager = require('./database/dbmanager')
//DB

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });  
}


app.use(express.json());



app.get('/api/gettherapists', async (req, res) => {    
    const list = await dbManager.getTherapists()
    res.json(list)
  })

  app.get('/api/getpatients', async (req, res) => {
    const list = await dbManager.getPatients()
    res.json(list)
  })

  app.get('/api/gettrainingtypes', async (req, res) => {
    const list = await dbManager.getTrainingTypes()
    res.json(list)
  })



app.get('/api/getsessions', async (req, res) =>{
  const {patientsids, therapistsids, startdate, enddate, trainingtype} = req.query;
  
  const parsedPIds = patientsids.split(',').map(id => parseInt(id));
  const parsedTIds = therapistsids.split(',').map(id => parseInt(id));

  const rows = await dbManager.getSessions(parsedPIds, parsedTIds, trainingtype, startdate, enddate)

  //JS Reducer used to sort array by patient_id
  const groupedData = rows.reduce((acc, session) => {
    //Takes in consideration the patient_id of current object
    const key = session.patient_id;
    //Looks in the accumulator's nested arrays to find if any object contains same patient_id.
    const group = acc.find(item => item && item[0] && item[0].patient_id === key);
    //If patient_id is found push the current object in that nested array
    //If not create new nested array within the accumulator
    if (group) {
      group.push(session);
    } else {
      acc.push([session]);
    }
    
    return acc;
    //Accumulator initial value is an empty array
  }, []);
    
  res.json(groupedData)
  
})

app.post('/api/record', async (req, res) =>{
  
  try {
    const result = dbManager.insertRecord(req.body)
    res.sendStatus(200);
  } catch (error) {
      // Send a 500 status code with an error message
      console.log(error)
      res.status(500).send('Internal server error: ' + error.message);
  }
  
  
})

app.use(express.static(path.join(__dirname, 'build')));
// Serve the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Environment: ${process.env.NODE_ENV}` )
})