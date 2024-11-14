const express = require('express');
const { dbConnect } = require('./mongo_db_connection');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

app.get('/',async (req,res)=>{
    let data = await dbConnect();
    let result  = await data.find({}).toArray();
    res.send(result);
});

app.delete('/:id',async(req,res)=>{
  let data = await dbConnect();
  let id = req.params.id;
  let result = await data.deleteOne({_id:new ObjectId(id)});

   res.send(result);
});  

app.put('/',async(req,res)=>{
    let data = await dbConnect();
    const { filter, update } = req.body;
    let result = await data.updateMany(filter,update);
    res.send(result);
    console.log(result);
});
// {
//     "filter": { "name": "redmi Note 12" },
//     "update": { "$set": { "name": "Redmi Note 12" } }
//   }
app.listen(8080);
