const express = require('express');
const Tour = require('./../models/tour');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', async (req, res, next) => {
 const tourId = req.body.tourId;
  try{
    const newItienerary = new Tour.itinerary({
      'day': req.body.day,
      'date': req.body.date,
      'title': req.body.title,
      'breakfast': req.body.breakfast,
      'lunch': req.body.lunch,
      'dinner': req.body.dinner,
      'description': req.body.description,
      'place': req.body.place
     })
    const tour = await Tour.tour.findById(tourId);
    tour.itinerary.push(newItienerary );
    tour.save();
    res.status(200).json({
      message: tour.itinerary
    });
  }
  catch(error){}
});

router.get('/:id', async (req, res, next)=>{
  const tourId = mongoose.Types.ObjectId(req.params.id);
  try{

    const itinerary = await Tour.tour
    .findById({_id: tourId})

  res.status(200).json({
    itinerary: itinerary.itinerary
  });

  }catch(error) {

  }
});



router.put('', [checkAuth], async(req, res, next) => {
  console.log(req.body);
  const tourId = mongoose.Types.ObjectId(req.body.tourId);
  try{
    const tour = await Tour.tour.findById({_id: tourId});

  res.status(200).json({
    response: tour
  });

  }catch(error){

  }

});

module.exports = router;
