const mongoose = require('mongoose');
const url ='mongodb://127.0.0.1:27017/test'

const db=mongoose.connect(url).then((conn)=>
{
console.log("Connected to DataBase")
}).catch((err)=>
{
  console.log(err)
})