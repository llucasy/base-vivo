var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
  }

  let docs = [];
  let lista1n = "";
  let lista2n = "";
  let lista3n = "";

  res.render("bulk", {
    docs,
    lista1n,
    lista2n,
    lista3n,
    title: "Pesquisa e alteração em massa - Usuário: " + sess.login
  });
});

/* POST new page. */
router.post("/", function(req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
  }

  let item = {};
  let limit = 500;
  let project = {};
  let lista1 = {};
  let lista2 = {};
  let lista3 = {};
  let lista1n = "";
  let lista2n = "";
  let lista3n = "";

  if (req.body.lista1) {
    lista1n = req.body.lista1;
    lista1 = { [lista1n]: 1 };
  }

  if (req.body.lista2) {
    let requi = req.body.lista2;
    lista2 = { [requi]: 1 };
  }

  if (req.body.lista3) {
    let requi = req.body.lista3;
    lista3 = { [requi]: 1 };
  }

  let str = req.body.bulkLinhas;
  let arr = str.replace(/\r\n|\n/g, " ").split(" ").map(String)

  item = { linha: { $in: arr } };

  project = { ...lista1, ...lista2, ...lista3 };

  if (req.body.pesquisar) {
    global.db.findAll(project, limit, item, (e, docs) => {
      if (e) {
        return console.log(e);
      }

      res.render("bulk", {
        docs,
        lista1n,
        lista2n,
        lista3n,
        title: "Pesquisa e alteração em massa - Usuário: " + sess.login
      });
    });
  }

  let local = {};
  let razao = {};
  let plano = {};
  let status = {};
  let grupo = {};
  let obs = {};
  let motivo = {};
  let bloqGestao = {};
  let extra = {};
  let dtBloqGestao = {};

  let registro = "";

  if (req.body.local) {
    local = { local: req.body.local };
    registro += "Local: " + req.body.local + " ";
  }

  if (req.body.razao) {
    razao = { razao: req.body.razao };
    registro += "Razão Social: " + req.body.razao + " ";
  }

  if (req.body.plano) {
    plano = { plano: req.body.plano };
    registro += "Plano: " + req.body.plano + " ";
  }

  if (req.body.status) {
    status = { status: req.body.status };
    registro += "Status: " + req.body.status + " ";
  }

  if (req.body.grupo) {
    grupo = { grupo: req.body.grupo };
    registro += "Grupo: " + req.body.grupo + " ";
  }

  if (req.body.obs) {
    obs = { obs: req.body.obs };
    registro += "Obs.: " + req.body.obs + " ";
  }

  if (req.body.motivo) {
    motivo = { motivo: req.body.motivo };
    registro += "Motivo: " + req.body.motivo + " ";
  }

  if (req.body.bloqGestao) {
    bloqGestao = { bloqGestao: req.body.bloqGestao };
    registro += "Bloqueio Gestão: " + req.body.bloqGestao + " ";
    if (req.body.bloqGestao === "Bloqueado") {
      dtBloqGestao = { dtBloqGestao: new Date() };
    } else {
      dtBloqGestao = { dtBloqGestao: "" };
    }
  }

  if (req.body.extra) {
    extra = { extra: req.body.extra };
    registro += "Extra: " + req.body.extra + " ";
  }

  item = {
    ...local,
    ...razao,
    ...plano,
    ...status,
    ...grupo,
    ...obs,
    ...motivo,
    ...bloqGestao,
    ...extra,
    ...dtBloqGestao
  };

  let id = req.body.id;

  let logs = { usuario: sess.login, registro: registro, data: new Date() };

  if (id) {
    global.db.updateOne(id, item, (err, result) => {
      if (err) {
        return console.log(err);
      }

      global.db.log(id, logs, (err, result) => {
        if (err) {
          return console.log(err);
        }

        res.redirect("/");
      });
    });
  }
});

module.exports = router;
