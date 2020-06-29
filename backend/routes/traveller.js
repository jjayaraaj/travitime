const express = require('express');
const Joi = require('@hapi/joi');
const checkAuth = require('./../middleware/check-auth');
const mongoose = require('mongoose');

const Tour = require('./../models/tour');

const router = express.Router();

router.post('', [checkAuth], async(req, res, next) => {

  const tourId = req.body.tourId;

 try{
   const newTraveller = new Tour.traveller({
    'travellerName': req.body.travellerName,
    'gender': req.body.gender,
    'dob': req.body.dob,
    'nationality': req.body.nationality,
    'passportNo': req.body.passportNo,
    'senior': req.body.senior,
    'documents': req.body.documents,
    'active': 1,
   })
  const tour = await Tour.tour.findById(tourId);
  tour.group.travellers.push(newTraveller);
  tour.save();
  res.status(200).json({
      message: tour.group.travellers
    });

 }catch(error) {

 }
});

router.get('/:id',[checkAuth], async (req, res, next)=>{
  const tourId =  mongoose.Types.ObjectId(req.params.id);
  try{

    const travellers = await Tour.tour
    .findById({_id: tourId})

  res.status(200).json({
    travellers: travellers.group.travellers
  });

  }catch(error) {

  }
});


module.exports = router;
