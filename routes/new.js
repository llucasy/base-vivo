var express = require("express");
var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.render('new', { title: 'Novo Cadastro', linhasgestao: {_id: '', nome: '', idade:0, uf: ''} });
// });

/* Alterar **/
router.get("/:id", function(req, res, next) {
  var sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
  }

  var id = req.params.id;

  global.db.findOne(id, (err, linhasgestao) => {
    if (err) {
      return console.log(err);
    }

    res.render("new", {
      title: "Usuário: " + sess.login + " - Detalhes da linha: ",
      linhasgestao
    });
  });
});

/* POST new page. */
router.post("/", function(req, res, next) {
  let local = {};
  let razao = {};
  let plano = {};
  let status = {};
  let grupo = {};
  let obs = {};
  let motivo = {};
  let bloqGestao = {};
  let extra = {};

  if (req.body.local) {
    local = { local: req.body.local };
  }

  if (req.body.razao) {
    razao = { razao: req.body.razao };
  }

  if (req.body.plano) {
    plano = { plano: req.body.plano };
  }

  if (req.body.status) {
    status = { status: req.body.status };
  }

  if (req.body.grupo) {
    grupo = { grupo: req.body.grupo };
  }

  if (req.body.obs) {
    obs = { obs: req.body.obs };
  }

  if (req.body.motivo) {
    motivo = { motivo: req.body.motivo };
  }

  if (req.body.bloqGestao) {
    bloqGestao = { bloqGestao: req.body.bloqGestao };
  }

  if (req.body.extra) {
    extra = { extra: req.body.extra };
  }

  let item = {
    ...local,
    ...razao,
    ...plano,
    ...status,
    ...grupo,
    ...obs,
    ...motivo,
    ...bloqGestao,
    ...extra
  };

  let id = req.body.id;

  if (id) {
    global.db.updateOne(id, item, (err, result) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
  } else {
    //  global.db.insert({nome, idade, uf}, (err, result) => {
    //      if(err) { return console.log(err); }
    //      res.redirect('/');

    res.send("iD não existe, avise o Lucas, o admin do sistema");
  }
});

module.exports = router;
