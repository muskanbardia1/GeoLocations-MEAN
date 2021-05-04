const express = require('express');

const Location = require('./models/location');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/GeoLocation', (err) => {
  if(!err)
    console.log('MongoDB connection succeeded');
  else
    console.log('Error in DB connection : ', JSON.stringify(err, undefined, 2));
});
const app = express();

app.use(express.json());

app.get('/',(req, res)=>{
  console.log(typeof(req.query.lng));
  console.log(parseFloat(req.query.long));
    var lat=Number(req.query.lat);
    var lng=Number(req.query.lng);
    Location.findOne({
      location: { $near: { $geometry: { type: "Point", coordinates: [lng, lat] }, $minDistance: 0, $maxDistance: 500000 } }
    })
    .then((result)=>{
        res.send(result)})
    .catch(err=>res.send(err))
    
});
app.post('/',(req,res)=>{
    Location.create(req.body).then((data)=>{
        res.send(data);
    }).catch((err)=>{
      res.send(err);
    });
})


app.listen(3000, () => console.log('server started at port : 3000'));