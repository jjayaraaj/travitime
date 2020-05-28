const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "naturesoul_jwtPrivateKey");
    next();
  }catch(error) {
    res.status(401).send({message: "Auth failed!"});
  }

};
