const express = require("express");
var path=require('path')
const app = express();
require("dotenv").config();
const cors = require('cors')
const multer = require('multer')
var morgan=require('morgan')
var rfs=require('rotating-file-stream')
var User = require('./models/userModel');
var Doctor = require('./models/doctorModel');
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage });
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Welcome to mongo db')
})
app.post('https://hapilyf.onrender.com/login',(req,res)=>{
  try {
    const user =  User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch =  bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
})
// app.get('/api/doctor/get-appointments-by-doctor-id',(req,res)=>{
//   res.render()
// })

app.post('/image',upload.single('file'),function(req,res){
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
})


var access=rfs.createStream('access.log',{
    interval: '1h' ,
    path:path.join(__dirname,'log')
})
app.use(morgan('tiny',{stream:access}))
const dbConfig = require("./config/dbConfig");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");


app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);


const port = process.env.PORT || 5000;
console.log(process.env.MONGO_URL);
app.listen(port, () => console.log(`Listening in the port ${port}`));


