var dotenv = require('dotenv');
dotenv.config();
module.exports = {
    mongoURI:process.env.mongoURI,
    secretOrKey: "secret"
  };