const express=require('express');
var router=express.Router();
var ObjectId= require('mongoose').Types.ObjectId;

var { Employee }=require('../models/employee');


router.get('/',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log("Error in read "+JSON.stringify(err,undefined,2));}
    });
});
router.get('/:id',(req,res)=>
{   if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record for the given id'+req.params.id);

    Employee.findById(req.params.id,(err,docs)=>
    {if(!err){res.send(docs);}
    else{console.log("Error in read "+JSON.stringify(err,undefined,2));}

    });
});

router.post('/',(req,res)=>
{
var emp=new Employee(
    {
        name:req.body.name,
    position:req.body.position,
    office:req.body.office,
    salary:req.body.salary,
    contact:req.body.contact
    });
    emp.save((err,doc)=>{
        if(!err){res.send(doc);}
        else{console.log("Error in creation "+JSON.stringify(err));}
    });
});

router.put('/:id',(req,res)=>
{if(!ObjectId.isValid(req.params.id))
    {
        return res.status(400).send("No records with the given id exist");
    }

    var emp ={
        name:req.body.name,
    position:req.body.position,
    office:req.body.office,
    salary:req.body.salary,
    contact:req.body.contact
    };
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>
{      if(!err){res.send(doc);}
        else{console.log("Error in Employee update "+JSON.stringify(err));}
})    
});

router.delete('/:id',(req,res)=>
{   if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record for the given id'+req.params.id);    
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>
    {if(!err){res.send(doc);}
    else{console.log("Error in Employee delete "+JSON.stringify(err));}
    });    
});
module.exports=router;