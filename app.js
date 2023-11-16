const express = require('express')
const app = express()
const port = 3000
const dbManager = require('./database/dbmanager')
//DB



//(async () => await console.log(asyncdb.getTherapists()))()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/', (req, res) => {
  res.json([{a:3}])
})

app.get('/gettherapists', async (req, res) => {
    console.log("Gettherapists request received")
    const list = await dbManager.getTherapists()
    res.json(list)
  })

  app.get('/getpatients', async (req, res) => {
    const list = await dbManager.getPatients()
    res.json(list)
  })



app.get('/getsessions', async (req, res) =>{
  const {patientsids, therapistsids, startdate, enddate} = req.query;
  
  const parsedPIds = patientsids.split(',').map(id => parseInt(id));
  const parsedTIds = therapistsids.split(',').map(id => parseInt(id));

  const rows = await dbManager.getSessions(parsedPIds, parsedTIds, startdate, enddate)

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
  console.log("*******************************************************************************************")
  console.log(groupedData)
  



  
  res.json(groupedData)
  
})


   
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


