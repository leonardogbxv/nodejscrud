//db.js
//Responsible for connecting and manipulating our database

// load the 'MongoClient' object from the 'mongodb' module
// database connection
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost', {useUnifiedTopology: true})
           .then(conn => global.conn = conn.db('nodejscrud'))
           .catch(err => console.log(err));

// returns data from "customers" collection
function findAll(callback) {
  global.conn.collection('customers').find({}).toArray(callback);
}

// inserts data in "customers" collection
function insertOne(customer, callback) {
  global.conn.collection('customers').insert(customer, callback);
}

// returns a single data by id (customer from 'customers')
let ObjectId = require('mongodb').ObjectID;
function findOne(id, callback) {
  global.conn.collection('customers').find(new ObjectId(id)).toArray(callback);
}

// update data in "customers" collection
function update(id, customer, callback) {
  global.conn.collection('customers').updateOne({_id: new ObjectId(id)}, {$set: customer}, callback);
}

// delete data in "customers" collection
function deleteOne(id, callback) {
  global.conn.collection('customers').deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insertOne, findOne, update, deleteOne }