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
  let str = ''

   global.db.distinctGrupo((err, distinctGrupo) => {
          if (err) {
              console.log(err);              
          }
        res.render("bulk", {
            docs,
            lista1n,
            lista2n,
            lista3n,
            str,
            title: "Pesquisa e alteração em massa - Usuário: " + sess.login,
            distinctGrupo
        });
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
  let linha = { linha: 1 } 

  if (req.body.lista1) {
    lista1n = req.body.lista1;
    lista1 = { [lista1n]: 1 };
  }

  if (req.body.lista2) {
    lista2n = req.body.lista2;
    lista2 = { [lista2n]: 1 };
  }

  if (req.body.lista3) {
    lista3n = req.body.lista3;
    lista3 = { [lista3n]: 1 };
  }

  let str = req.body.bulkLinhas;
  let arr = str.replace(/\r\n|\n/g, " ").split(" ").map(String)

  item = { linha: { $in: arr } };

  project = { ...linha, ...lista1, ...lista2, ...lista3 }; 


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
        str,
        title: "Pesquisa e alteração em massa - Usuário: " + sess.login
      })
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

  let registro = '';
  let registroVisivel = ''

  if (req.body.acao) {
    registroVisivel += req.body.acao + ' '
  }  

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
    registroVisivel += req.body.grupo + ' '
  }

  if (req.body.obs) {
    obs = { obs: req.body.obs };
    registro += "Obs.: " + req.body.obs + " ";
  }

  if (req.body.motivo) {
    motivo = { motivo: req.body.motivo };
    registro += "Motivo: " + req.body.motivo + " ";
    registroVisivel += req.body.motivo
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

  let mod = {
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

  let logs = { usuario: sess.login, registro: registro, registroVisivel: registroVisivel, data: new Date() };

  if (req.body.salvar) {
    global.db.bulk(item, mod, (err, result) => {
      if (err) {
        return console.log(err);
      }

      global.db.logBulk(item, logs, (err, result) => {
        if (err) {
          return console.log(err);
        }

        res.redirect("/");
      });
    });
  }
});

module.exports = router;
