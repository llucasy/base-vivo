var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  var sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
  }

  let login = sess.login;
  let limit = 30;

  let pesq = {};
  let local = {};
  let razao = {};
  let plano = {};
  let status = {};
  let grupo = {};
  let extra = {};

  let valorPesquisado;
  let valorPesquisadoGrupo;

  if (req.query.limit) {
    limit = Number(req.query.limit);
  }

  if (req.query.pesqCamp) {
    let re = new RegExp(`\\b${req.query.pesqCamp}`);
    pesq = { linha: { $regex: re } };
    valorPesquisado = req.query.pesqCamp;
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

  if (req.query.grupo) {
    grupo = { grupo: req.query.grupo };
    valorPesquisadoGrupo = req.query.grupo;
  }

  if (req.query.extra) {
    extra = { extra: req.query.extra };
  }

  let item = Object.assign(
    pesq,
    local,
    razao,
    plano,
    status,
    grupo,
    extra,
  );

  let project = { motivo: 0, bloqGestao: 0, log: 0}

  global.db.findAll(project, limit, item, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    global.db.contar(item, (err, contaRegistro) => {
      if (err) {
        console.log(err);
      }

      global.db.distinctGrupo((err, distinctGrupo) => {
          if (err) {
              console.log(err);              
          }
        res.render("index", {
            docs,
            contaRegistro,
            login,
            valorPesquisado,
            valorPesquisadoGrupo,
            local,
            razao,
            plano,
            status,
            grupo,
            extra,
            limit,
            distinctGrupo
        });
      });
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
