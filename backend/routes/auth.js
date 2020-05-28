const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
    if (!user)  return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword)  return res.status(400).send('Invalid email or password');

    //const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
    const token = jwt.sign({ _id: user._id, email: user.email}, "naturesoul_jwtPrivateKey");
    res.status(200).json({token});

  }catch (error) {
    return res.status(400).send(error.message);
  }

});

function validataionError(message) {
  let Schema = Joi.object({
    'password': Joi.string().required(),
    'email': Joi.string().email().required()

  })

  return Schema.validate(message);
}

module.exports = router;
