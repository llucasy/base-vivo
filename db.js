const key = process.env.BANCO_SENHA;

var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

mongoClient
  .connect(
    "mongodb+srv://llucasy:" +
      key +
      "@cluster0-ayz50.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then(conn => (global.conn = conn.db("workshop")))
  .catch(err => console.log(err));

function findAll(callback) {
  global.conn
    .collection("customers")
    .find({})
    .toArray(callback);
}

function insert(customer, callback) {
  global.conn.collection("customers").insert(customer, callback);
}

function deleteOne(id, callback) {
  global.conn
    .collection("customers")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}

function findOne(id, callback) {
  global.conn
    .collection("customers")
    .findOne({ _id: new ObjectId(id) }, callback);
}

function updateOne(id, item, callback) {
  global.conn
    .collection("customers")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome: item.nome, idade: item.idade, uf: item.uf } },
      callback
    );
}

module.exports = { findAll, insert, deleteOne, findOne, updateOne };
