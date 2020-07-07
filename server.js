const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const movies = require("./routes/api/movies");
const path = require("path");
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,
        useUnifiedTopology: true 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/movies",movies)
//Serve static assets
if(process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));

   app.get('*',(req,res) =>{
     res.sendFile(path.resolve(__dirname,'client','build','inde.html'));

   });
} 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));