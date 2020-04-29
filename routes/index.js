var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  
  let pesq = {}
  let local = {}
  let razao = {}
  let plano = {}
  let status = {}

  if (req.query.pesqCamp) {
    let re = new RegExp(`\\b${req.query.pesqCamp}`);
    pesq = { linha: { $regex: re } };
  }

  if (req.query.local) {
    local = { local: req.query.local };
  }

  if (req.query.razao) {
    razao = { razao: req.query.razao };
  }

  if (req.query.plano) {
    plano = { plano: req.query.plano };
  }

  if (req.query.status) {
    status = { status: req.query.status };
  }

  let item = Object.assign(pesq, local, razao, plano, status);

  global.db.findAll(item, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    global.db.contar(item, (err, contaRegistro) => {
      if (err) {
        console.log(err);
      }
      res.render("index", { docs, contaRegistro });
    });
  });
});

/* GET delete page. */

// router.get("/delete/:id", function(req, res) {
//   var id = req.params.id;
//   global.db.deleteOne(id, (e, r) => {
//     if (e) {
//       return console.log(e);
//     }
//     res.redirect("/");
//   });
// });

module.exports = router;
