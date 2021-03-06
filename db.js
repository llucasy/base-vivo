var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

mongoClient
  .connect(
    "mongodb+srv://" +
      process.env.BANCO_LOGIN +
      ":" +
      process.env.BANCO_SENHA +
      "@cluster0-ayz50.mongodb.net/workshop?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
  .then(conn => (global.conn = conn.db("workshop")))
  .catch(err => console.log(err));

function findAll(project, limit, item, callback) {
  global.conn
    .collection("linhasgestao")
    .find(item)
    .limit(limit)
    .project(project)
    .toArray(callback);
}

function insertMany(item, callback) {
   global.conn.collection("linhasgestao").insertMany(item, callback);
 }

// function deleteOne(id, callback) {
//   global.conn
//     .collection("linhasgestao")
//     .deleteOne({ _id: new ObjectId(id) }, callback);
// }

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

function log(id, logs, callback) {
  global.conn.collection("linhasgestao").update(
    { _id: new ObjectId(id) }, { $push: { log: { $each: [logs], $sort: { data: -1}}}}, callback
  )
}

function logBulk(item, logs, callback) {
  global.conn.collection("linhasgestao").updateMany(
    item, { $push: { log: { $each: [logs], $sort: { data: -1}}}}, callback
  )
}

function bulk(item, mod, callback) {
  global.conn.collection('linhasgestao').updateMany(item, {$set: mod}, callback)
}

function distinctGrupo(callback) {
    global.conn.collection('linhasgestao').distinct('grupo', callback)
}

module.exports = { findAll, insertMany, findOne, updateOne, contar, log, logBulk, bulk, distinctGrupo };
