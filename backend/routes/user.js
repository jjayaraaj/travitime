var _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
//models
const User = require('./../models/user');

const router = express.Router();

router.post("", async (req, res, next)=>{

  const {error} =  validataionError(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }



  try{
    let user =  await User.findOne({email: req.body.email});
    if (user)  return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['firstName', 'lastname', 'username', 'password', 'email', 'mobile', 'country' ]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    res.status(201).send(_.pick(user, ['_id', 'username', 'email']))

  }catch (error) {
    return res.status(400).send(error.message);
  }

});


router.get("", async (req, res, next) => {

  try{
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  }catch(err) {
    console.log(error.message)
  }
  const users = await User.find();

});

function validataionError(message) {
  let Schema = Joi.object({
    'firstName': Joi.string().alphanum().min(3).max(50).required(),
    'lastname': Joi.string().alphanum().min(3).max(50).required(),
    'username': Joi.string().alphanum().min(3).max(50).required(),
    'password': Joi.string().required(),
    'email': Joi.string().email().required(),
    'mobile':Joi.number().required(),
    'country': Joi.string().required()
  })

  return Schema.validate(message);
}

module.exports = router;
