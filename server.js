require('./connection')
const express=require('express')

const app=express();
const bodyParser = require('body-parser'); // middleware
const User = require('./User');


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/',(req,resp)=>
{
    app.set({
        "Allow-access-Allow-Origin": '*'
    })
    return resp.redirect('login.html')
})


app.post('/setreminder',async(req,resp)=>
{
    const email=req.body.email
    const adddesc=req.body.adddesc
    const contact=req.body.contact
    const Sms=req.body.Sms
    const recur=req.body.recur
    const subject=req.body.subject
    const reminder=req.body.Reminder
    const date=req.body.date

    console.log(subject +reminder+date)

    var userDetails = new User({
        adesc: adddesc,
        email: email,
        contact:contact,
        Sms:Sms,
        recur:recur,
        date:date,

        subject:subject,
        reminder:reminder
      });
      const result=await userDetails.save();
    //   console.log(result)
    //   resp.render
    return resp.redirect('loginsucces.html')
})

app.get('/deletereminder',(req,resp)=>
{
    app.set({
        "Allow-access-Allow-Origin": '*'
    })
    return resp.redirect('deletereminder.html')
})
app.post('/deletereminder',async(req,resp)=>
{
 const date=req.body.date
//  const data=await User.find({'date':date})
  const result=await User.deleteOne({'date':date})
  console.log(result)
// resp.send("okay")
//  resp.redirect('loginsucces.html')
 
})
app.get('/modifyreminder',async(req,resp)=>
{
//    resp.send("i am server") 
resp.redirect('modifyreminder.html')

})
app.post('/modifyreminder',async(req,resp)=>
{
      const date=req.body.date
      const subject=req.body.subject
      const reminder=req.body.reminder
      const contact=req.body.contact
  const sms=req.body.Sms
 const email=req.body.email
  const recur=req.body.recur
  const description=req.body.adddesc
//  const result=await User.find({'date':date})
const  result=await User.updateMany({date:date}, { $set: { Sms: sms,email:email,contact:contact,recur:recur,adddesc:description ,reminder:reminder,subject:subject} })
console.log(result)
resp.redirect('modifysuccess.html')
})

app.get('/viewreminder',async(req,resp)=>
{
const fetchData=await User.find({})
console.log(fetchData)
resp.send(fetchData)
})


app.listen(4500,()=>
{
    console.log("Server Running on:4500")
})