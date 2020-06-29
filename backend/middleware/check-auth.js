const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try{
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "naturesoul_jwtPrivateKey");
    req.userData = { email: decodedToken.email, userId: decodedToken._id}
    next();
  }catch(error) {
    console.log(req.headers.authorization);

    res.status(401).send({message: "Auth failed!"});
  }

};
