const express = require("express");
var path=require('path')
const app = express();
const BASE_URL=process.env.BASE_URL;
require("dotenv").config();
const cors = require('cors')
const multer = require('multer')
var morgan=require('morgan')
var rfs=require('rotating-file-stream')
var Users = require('./models/userModel');
var Doctor = require('./models/doctorModel');
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const swaggerJSDoc=require('swagger-jsdoc')
// const swaggerSpec=require("./swagger.json")
const swaggerUi = require('swagger-ui-express')
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

const options={
  definition:{
    openapi: '3.0.0',
    info : {
      title: 'Swagger',
      version: '1.0.0'
    },
    servers:[
      {
        url: `${BASE_URL}`
      }
    ]
  },
  apis:['./server.js']
}


// const swaggerSpec= swaggerJSDoc(options)
// app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))




// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          User:
//  *              type: object
//  *              properties:
//  *                  name:
//  *                      type: string
//  *                  email:
//  *                      type: string
//  *                  password:
//  *                      type: string
//  *          Doctor:
//  *              type: object
//  *              properties:
//  *                  firstName:
//  *                      type: string
//  *                  lastName:
//  *                      type: string
//  *                  phoneNumber:
//  *                      type: string 
//  *                  website:
//  *                      type:string
//  *                  MedicalCertificate:
//  *                      type:string
//  *                  address:
//  *                      type:string 
//  *                  specialization:
//  *                      type:string
//  *                  experience:
//  *                      type:integer
//  *                  feePerConsultation:
//  *                      type:integer
//  *                  timings:
//  *                      type:object
//  *      
//  */
 
// /**
//  * @swagger
//  * /api/user/register:
//  *  post:
//  *      summary: create a new user
//  *      description: create new user with given user details and adds to the database
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#components/schemas/User'
//  *      responses:
//  *          200:
//  *              description: Success
//  *              content:
//  *                  aication/json:
//  *                      schema:
//  *                          type: array
//  *                          items:
//  *                              $ref: '#components/schemas/User'
//  *
//  */
// // /**
// //  * @swagger
// //  * /api/doctor/update-doctor-profile:
// //  *  put:
// //  *      summary: create a new user
// //  *      description: create new user with given user details and adds to the database
// //  *      requestBody:
// //  *          required: true
// //  *          content:
// //  *              application/json:
// //  *                  schema:
// //  *                      $ref: '#components/schemas/Doctor'
// //  *      responses:
// //  *          200:
// //  *              description: Success
// //  *              content:
// //  *                  aication/json:
// //  *                      schema:
// //  *                          type: array
// //  *                          items:
// //  *                              $ref: '#components/schemas/Doctor'
// //  *
// //  */
// // /**
// //  * @swagger
// //  * /api/user/register:
// //  *  post:
// //  *      summary: create a new user
// //  *      description: create new user with given user details and adds to the database
// //  *      consumes:
// //  *      - "multipart/form-data"
// //  *      produces:
// //  *      - "application/json"
// //  *      parameters:
// //  *      - name: "name"
// //  *        in: "formData"
// //  *        type: "string" 
// //  *      - name: "email"
// //  *        in: "formData"
// //  *        type: "string"
// //  *      - name: "password"
// //  *        in: "formData"
// //  *        type: "string"  
// //  *      responses:
// //  *          200:
// //  *              description: Success
// //  * 
// //  */
// // /**
// //  * @swagger
// //  * /api/doctor/update-doctor-profile:
// //  *   put:
// //  *     summary: Update a user's profile
// //  *     consumes:
// //  *       - "multipart/form-data"  
// //  *     produces:
// //  *       - "application/json"  
// //  *     parameters:
// //  *       - name: "firstName"
// //  *         in: "formData"
// //  *         schema:
// //  *           type: string
// //  *       - name: "lastName"
// //  *         in: "formData"
// //  *         type: string 
// //   *     responses:
// //  *       '200':
// //  *         description: User profile updated successfully
// //  *       '404':
// //  *         description: User not found
// //  *       '500':
// //  *         description: Server error
// //  */
// /**
//  * @swagger
//  * /api/doctor/update-doctor-profile:
//  *   put:
//  *     summary: Update a user's profile
//  *     consumes:
//  *       - "multipart/form-data"  
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         description: ID of the user to update
//  *         required: true
//  *         schema:
//  *           type: string
//  *       - name: profile
//  *         in: body
//  *         description: Updated user profile
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             firstName:
//  *               type: string
//  *             lastName:
//  *               type: string
//  *             phoneNumber:
//  *               type: string 
//  *             website:
//  *               type: string
//  *             MedicalCertificate:
//  *               type: string
//  *             address:
//  *               type: string 
//  *             specialization:
//  *               type: string
//  *             experience:
//  *               type: integer
//  *             feePerConsultation:
//  *               type: integer
//  *             timings:
//  *               type: string
//  *     responses:
//  *       '200':
//  *         description: User profile updated successfully
//  *       '404':
//  *         description: User not found
//  *       '500':
//  *         description: Server error
//  */
// // app.put('/users/:id/profile', function (req, res) {
// //   // Handle PUT request to update user profile
// // });


// // /**
// //  * @swagger
// //  * /api/admin/get-all-doctors:
// //  *  get:
// //  *    summary: This api is used to check if get methods is working or not
// //  *    description: This api is used to check if get methods is working or not
// //  *    responses:
// //  *        200:
// //  *            description: To test get method
// //  */



// // /**
// //  * @swagger
// //  * /api/user/book-appointment:
// //  *  post:
// //  *    summary: This api is used to check if get methods is working or not
// //  *    description: This api is used to post methods is working or not
// //  *    responses:
// //  *        200:
// //  *            description: To get doctor info by id
// //  */

// /**
//  * @swagger
//  * /api/admin/get-all-appointments:
//  *  get:
//  *    summary: This api is used to check if get methods is working or not
//  *    description: This api is used to get all appointments
//  *    responses:
//  *        200:
//  *            description: To get all appointments
//  */
// /**
//  * @swagger
//  * /api/admin/get-all-users:
//  *  get:
//  *    summary: This api is used to check if get methods is working or not
//  *    description: This api is used to get all users
//  *    responses:
//  *        200:
//  *            description: To get all users
//  */
// /** 
// * @swagger
// * /api/admin/get-all-doctors:
// *  get:
// *    summary: This api is used to check if get methods is working or not
// *    description: This api is used to get all users
// *    responses:
// *        200:
// *            description: To get all users
// */

// // /**
// // * @swagger
// // * /api/user/apply-doctor-account:
// // *  post:
// // *      summary: create a new doctor
// // *      description: create new doctor with given doctor details and adds to the database
// // *      requestBody:
// // *          required: true
// // *          content:
// // *           application/json:
// // *                  schema:
// // *                      $ref: '#components/schemas/Doctor'
// // *      responses:
// // *          200:
// // *              description: Success
// // *              content:
// // *                  application/json:
// // *                      schema:
// // *                          type: array
// // *                          items:
// // *                              $ref: '#components/schemas/Doctor'
// // *
// // */
app.get('/',(req,res)=>{
  res.send('Welcome to mongo db')
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


