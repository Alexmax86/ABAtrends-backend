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

app.get('/therapists', async (req, res) => {
    const list = await dbManager.getTherapists()
    res.json(list)
  })



app.get('/getsessions', async (req, res) =>{
  const {id, startdate, enddate} = req.query;
  const idNumber = Number(id);
  const rows = await dbManager.getSessions(idNumber, startdate, enddate)
  res.json(rows)
})


   
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


