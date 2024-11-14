const express = require('express');
const conn = require('./mysql_conn');
const app = express();

app.get('/',(req,res)=>{
 conn.query("select * from users",(err,result)=>{
   if(err){
    res.send('error',err);  
   }else{
    res.send("Sucess",result);
   }
 }); 
  res.sendStatus(200);
});

app.listen(8080);