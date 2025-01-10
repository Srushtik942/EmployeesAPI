const express = require('express');
const cors = require('cors');
const {getAllEmployees,getEmployeeById} = require('./controllers');
const app = express();
app.use(cors());
app.use(express.json());

// endpoint to get all employee

app.get('/employees', async (req, res) => {
  const result = await getAllEmployees();
  res.json({ result });
});

// Retrieve Employee by ID

app.get('/employees/details/:id',async(req,res)=>{
  let result = await getEmployeeById(req.params.id);
  res.json({
    result
  });
});

module.exports = {app};