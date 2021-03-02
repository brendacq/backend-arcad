const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const {token} = req.headers;

  if (!token) return res.status(401).json({message: "You need to log in!"});

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err){
      return res.status(401).json({ auth: false, message: "Something's wrong! Token doesn't match" });
      //console.log(err); 
    }

    // console.log(decoded);
    req.userId = decoded.userId;
    next();
  })
}

module.exports = verifyToken;