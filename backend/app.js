//const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const tourRoutes = require('./routes/tour');
const groupRoutes = require('./routes/group');
const travellerRoutes = require('./routes/traveller');
const itineraryRotues = require('./routes/itinerary');

const app = express();

/*if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}*/

mongoose.connect('mongodb://localhost/travitime', { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb...'))
  .catch(err => console.error("Could not connect mongodb...", err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));





app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});



app.use("/api/register", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/traveller", travellerRoutes);
app.use("/api/itinerary", itineraryRotues);

module.exports = app;

