const ProductModel  = require('./mongooseSchema');
const express = require('express');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());


 const SaveInDb = async () => {
     //const ProductModel = await DataSchema();
     const data = new ProductModel({ name: 'Oneplus 20s',brand:'Onplus' });
     const result = await data.save();
     console.log(result); 
}
//SaveInDb();

const UpdateInData = async () =>{
  //const ProductModel = await DataSchema();
  const result  = await ProductModel.updateOne(
    {name:'Oneplus Note 20'},
    {$set:{brand:'Oneplus'}} 
  )
   console.log(result); 
}
//UpdateInData() // 

const FindInDb = async() =>{
 // const ProductModel = await DataSchema();
  const result = await ProductModel.find();
  console.log(result);

}
//FindInDb();

///////////////////////////////////////with using express js  now ////////////////////////////////////////////

app.post('/create',async(req,res) => {
    //const ProductModel = await DataSchema();
    const data = new ProductModel(req.body);
    const result = await data.save();
    res.send(result);
    console.log(result); 
});

app.get('/list',async(req,res)=>{
  //const ProductModel = await DataSchema();
  const result = await ProductModel.find({});
  res.send(result);
  console.log(result); 
});

app.get('/delete/:id',async(req,res)=>{
   //const ProductModel = await DataSchema();
   let id =  req.params.id;
   const result = await ProductModel.deleteOne({_id:new ObjectId(id)});
   res.send(result);
   console.log("result--",result); 
});

//update api
app.get('/update',async(resq,res)=>{
  const ProductModel = await ProductModel();
  const {filter , update} = req.params.body;
  const result = ProductModel.updateOne(filter,update);
  console.log(result);
});

//search api
app.get('/search/:key',async (req,res)=>{
  let data = await ProductModel.find(
    {
     $or:[
      { name: { $regex: req.params.key}}
     ]
    }
  );
  res.send(data);
});



app.listen(8080);