const express = require('express');
const Joi = require('@hapi/joi');
var _ = require('lodash');
const checkAuth = require('./../middleware/check-auth');
const mongoose = require('mongoose');

const Tour = require('./../models/tour');


const router = express.Router();

router.post('', [checkAuth], async (req, res, next) => {

  const userId = req.userData.userId;

 const {error} =  validataionError(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  try {
  const tour = new Tour.tour({
    'tourName': req.body.tourName,
    'fromDate':  req.body.fromDate,
    'toDate':  req.body.toDate,
    'country':  req.body.country,
    'noOfDays':  req.body.noOfDays,
    'multicity':  req.body.multicity,
    'natureOfTravel':  req.body.natureOfTravel,
    'agentId' : userId

  });

    //const tour = new Tour.tour(_.pick(req.body, ['tourName', 'fromDate', 'toDate', 'country', 'noOfDays', 'multicity', 'natureOfTravel', 'publish' ]));
    //console.log(tour);
  const result = await tour.save();
    res.status(200).json({
      message: result
    });


  }catch(error) {
    return res.status(400).send("asdasd");
  }



});

router.get('', [checkAuth], async(req, res, next) => {

  try{
    const tours = await Tour.tour
    .find()
    .limit(6)
    .select({
      _id: 1, tourName:1, fromDate:1, toDate:1, country:1
    });

  res.status(200).json({
    tours: tours
  });

  }catch(error) {

  }

});

router.get('/all', async(req, res, next) => {
  try{

    const tours = await Tour.tour.find()
    .sort('fromDate')
    .select('-group -itinerary')

    res.status(200).json({
      response: tours
    });

  }catch(error) {

  }
});

router.get('/:id', [checkAuth], async(req, res, next) => {
  const id =  req.params['id'];

  try{
    const tour = await Tour.tour
    .findById({_id: id});

  res.status(200).json({
    response: tour
  });

  }catch(error){

  }

});


router.put('', [checkAuth], async(req, res, next) => {
  const tourId = mongoose.Types.ObjectId(req.body.tourId);
  try{
    const tour = await Tour.tour
    .updateOne(
      {_id: tourId},
      { $set: {
          tourName: req.body.tourName,
          fromDate: req.body.fromDate,
          toDate: req.body.toDate,
          country: req.body.country,
          noOfDays: req.body.noOfDays,
          multicity: req.body.multicity,
          natureOfTravel: req.body.natureOfTravel
        }
      }
      );

    if(!tour) return;

    tour.tourName = req.body.tourName;
    await tour.save();

  res.status(200).json({
    response: tour
  });

  }catch(error){

  }

});

function validataionError(message) {
  let Schema = Joi.object({
    'tourName': Joi.string().required(),
    'fromDate': Joi.date().required(),
    'toDate': Joi.date().required(),
    'country':Joi.string().required(),
    'noOfDays': Joi.number().required(),
    'multicity':Joi.string().required(),
    'natureOfTravel': Joi.string().required(),
    'publish': Joi.number()
  })

  return Schema.validate(message);
}

module.exports = router;
