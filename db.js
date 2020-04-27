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

function findAll(callback) {
  global.conn
    .collection("customers")
    .find({})
    .limit(30)
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

function contar(callback) {
  global.conn.collection("customers").countDocuments({}, {}, callback);
}

module.exports = { findAll, insert, deleteOne, findOne, updateOne, contar };
