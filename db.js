const mongoose=require('mongoose');
const url="mongodb://localhost:27017/crud";
mongoose.connect(url,(err)=>
{
    if(!err) console.log("Connection complete");
    else console.log("ERROR: "+JSON.stringify(err,undefined,2));
});

//export the created object
module.exports=mongoose;
