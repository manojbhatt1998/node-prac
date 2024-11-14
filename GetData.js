const { MongoClient, client, dbName, dbConnect } = require('./connection');

async function GetData()  {
  let data = await dbConnect();
  let result  = await data.find({}).toArray();
  console.log(result);
}