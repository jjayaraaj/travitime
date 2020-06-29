const express = require('express');
const Joi = require('@hapi/joi');
var _ = require('lodash');
const checkAuth = require('./../middleware/check-auth');
const mongoose = require('mongoose');

const Tour = require('./../models/tour');


const router = express.Router();

router.post('', [checkAuth], async (req, res, next) => {


  try {

    const tourId = req.body.tourId;
    //const tourId = '5ef0b693532b6f53989b5c98';
    const tour = await Tour.tour.findById(tourId);

    tour.group = new Tour.group({
      'contactNumber': req.body.contactNumber,
      'countryCode':  req.body.countryCode,
      'emailId':  req.body.emailId,
      'groupName':  req.body.groupName,
      'noOfTravellers':  req.body.noOfTravellers

    });

    const result = await tour.save();
    res.status(200).json({
      message: tour
    });


  }catch(error) {
    return res.status(400).send(error.message);
  }



});

router.get('/:id', async (req, res, next)=>{
  const id =  req.params['id'];
  try{
    const tour = await Tour.tour
    .findById({_id: id})
    .select({
      "group" : 1,
    })


    if(tour.group) {
      res.status(200).json({
        groupRes: tour
      });
    }else {
      res.status(200).json({
        groupRes: "noGroup"
      });
    }

  }catch(error){

  }

});

router.put('', [checkAuth], async(req, res, next) => {
  console.log(req.body);
  const tourId = mongoose.Types.ObjectId(req.body.tourId);
  try{
    const tour = await Tour.tour
    .updateOne(
      {_id: tourId},
      { $set: {

              "group.groupName": req.body.groupName,
              "group.contactNumber": req.body.contactNumber,
              "group.countryCode": req.body.countryCode,
              "group.emailId": req.body.emailId,
              "group.noOfTravellers": req.body.noOfTravellers
            }

        }

      );



  res.status(200).json({
    response: tour
  });

  }catch(error){

  }

});



module.exports = router;
