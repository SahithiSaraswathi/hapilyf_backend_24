
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection;
const client = new MongoClient("mongodb+srv://sahithi:sahithi@cluster0.ebh9w6j.mongodb.net")
const db= client.db("test")

// const queryLogCollection = db.collection("users");
// const slowQueries =queryLogCollection.find({ execution_time: { $gt: 1 } }).toArray();
// console.log(slowQueries);

connection.on('connected', () => {
    console.log('MongoDB is connection is successful');
})

connection.on('error', (error) => {
    console.log('Error in MongoDB connection', error)
})

module.exports = mongoose