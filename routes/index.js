var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var item;
  if (req.query.pesqCamp) {
    let re = new RegExp(`\\b${req.query.pesqCamp}`);
    item = { linha: { $regex: re } };
  }
  //String(req.params.pesqCamp)
  global.db.findAll(item, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    global.db.contar((err, contaRegistro) => {
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
