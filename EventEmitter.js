const express = require('express');
const EventEmitter = require('events');
const event = new EventEmitter();

const app = express();

let count = 0;

//this function 'countApi' will run when u run any of api
event.on('countApi',()=>{
    count++;
    console.log('count is --',count);
});

app.get('/update',(req,res)=>{
  res.send("yes");
  event.emit('countApi');
});

app.get('/search',(req,res)=>{
    res.send("Search");
    event.emit('countApi');
  });

app.listen(8080);