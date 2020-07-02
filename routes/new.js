var express = require("express");
var router = express.Router();
var moment = require('moment');
moment().format();

moment.locale('pt-BR');


function formatarValor(dados) {
  return moment(dados).utcOffset(-3).calendar();
}

function tempoRelativo(tempo) {
  let today = moment().utcOffset(-3)
  let momento = moment(tempo).utcOffset(-3)
  return today.diff(momento, 'days')
}

router.get("/:id", function(req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
  }

  var id = req.params.id;

  global.db.findOne(id, (err, linhasgestao) => {
    if (err) {
      return console.log(err);
    }

    global.db.distinctGrupo((err, distinctGrupo) => {
          if (err) {
              console.log(err);              
          }

        res.render("new", {
        title: "Detalhes da linha: " + linhasgestao.linha + " - Usuário: " + sess.login,
        linhasgestao, formatarValor: formatarValor, tempoRelativo: tempoRelativo, distinctGrupo
        });
    });
  });
});

router.post("/", function(req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/login");
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
  let registroVisivel = '';

  if (req.body.acao) {
    registroVisivel += req.body.acao + ' '
  }

  if (req.body.local) {
    local = { local: req.body.local };
    registro += 'Local: ' + req.body.local + ' '
  }

  if (req.body.razao) {
    razao = { razao: req.body.razao };
    registro += 'Razão Social: ' + req.body.razao + ' '
  }

  if (req.body.plano) {
    plano = { plano: req.body.plano };
    registro += 'Plano: ' + req.body.plano + ' '
  }

  if (req.body.status) {
    status = { status: req.body.status };
    registro += 'Status: ' + req.body.status + ' '
  }

  if (req.body.grupo) {
    grupo = { grupo: req.body.grupo };
    registro += 'Grupo: ' + req.body.grupo + ' '
    registroVisivel += req.body.grupo + ' '
  }

  if (req.body.obs) {
    obs = { obs: req.body.obs };
    registro += 'Obs.: ' + req.body.obs + ' '
  }

  if (req.body.motivo) {
    motivo = { motivo: req.body.motivo };
    registro += 'Motivo: ' + req.body.motivo + ' '
    registroVisivel += req.body.motivo
  }

  if (req.body.bloqGestao) {
    bloqGestao = { bloqGestao: req.body.bloqGestao };
    registro += 'Bloqueio Gestão: ' + req.body.bloqGestao + ' '
    if (req.body.bloqGestao === 'Bloqueado') {
      dtBloqGestao = {dtBloqGestao: new Date()}
    } else {
      dtBloqGestao = {dtBloqGestao: ''}
    }
  }

  if (req.body.extra) {
    extra = { extra: req.body.extra };
    registro += 'Extra: ' + req.body.extra + ' '
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
    ...extra,
    ...dtBloqGestao
  };

  let id = req.body.id;

  let logs = { usuario: sess.login, registro: registro, registroVisivel: registroVisivel, data: new Date()}

  if (id) {
    global.db.updateOne(id, item, (err, result) => {
      if (err) {
        return console.log(err);
      }

      global.db.log(id, logs, (err, result) => {
        if(err) { return console.log(err)}
        

        res.redirect("/");
      });

    });
  } else {

    res.send("iD não existe, avise o Lucas, o admin do sistema");
  }
});

module.exports = router;
