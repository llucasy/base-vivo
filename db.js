var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

mongoClient
  .connect(
    "mongodb+srv://" +
      process.env.BANCO_LOGIN +
      ":" +
      process.env.BANCO_SENHA +
      "@cluster0-ayz50.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then(conn => (global.conn = conn.db("workshop")))
  .catch(err => console.log(err));

function findAll(limit, item, callback) {
  global.conn
    .collection("linhasgestao")
    .find(item)
    .limit(limit)
    .toArray(callback);
}

function insert(customer, callback) {
  global.conn.collection("linhasgestao").insert(customer, callback);
}

function deleteOne(id, callback) {
  global.conn
    .collection("linhasgestao")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}

function findOne(id, callback) {
  global.conn
    .collection("linhasgestao")
    .findOne({ _id: new ObjectId(id) }, callback);
}

function updateOne(id, item, callback) {
  global.conn.collection("linhasgestao").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: item
    },
    callback
  );
}

function contar(item, callback) {
  global.conn.collection("linhasgestao").countDocuments(item, {}, callback);
}

module.exports = { findAll, insert, deleteOne, findOne, updateOne, contar };
