//import libraries
//third party
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
//self created
const {mongoose}=require('./db.js');
const employeeController=require('./controllers/employeeController.js');
//variables
const port=3000;

//Main code
var app=express();
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:4200"}));

app.listen(port,()=>{console.log("Service running on port:"+port)});

app.use('/employees',employeeController);