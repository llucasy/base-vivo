var express = require("express");
var router = express.Router();

var message = "";

router.get("/", function(req, res, next) {
  let sess = req.session;

  if (sess.login) {
    req.session.destroy(err => {
      if (err) {
        return console.log(err);
      }
    });
  }

  res.render("login", { message });
});

router.post("/", function(req, res, next) {
  let sess = req.session;

  switch (req.body.login) {
    case process.env.NATH_L:
      if (req.body.senha === process.env.NATH_S) {
        sess.login = req.body.login;
        message = "";
        res.redirect("/");
      } else {
        message = "Senha errada";
        res.render("login", { message });
      }
      break;

    case process.env.LUANA_L:
      if (req.body.senha === process.env.LUANA_S) {
        sess.login = req.body.login;
        message = "";
        res.redirect("/");
      } else {
        message = "Senha errada";
        res.render("login", { message });
      }
      break;

      case process.env.LUCG_L:
        if (req.body.senha === process.env.LUCG_S) {
          sess.login = req.body.login;
          message = "";
          res.redirect("/");
        } else {
          message = "Senha errada";
          res.render("login", { message });
        }
        break;

        case process.env.FERNANDO_L:
        if (req.body.senha === process.env.FERNANDO_S) {
          sess.login = req.body.login;
          message = "";
          res.redirect("/");
        } else {
          message = "Senha errada";
          res.render("login", { message });
        }
        break;

        case process.env.LUCAS_L:
        if (req.body.senha === process.env.LUCAS_S) {
          sess.login = req.body.login;
          message = "";
          res.redirect("/");
        } else {
          message = "Senha errada";
          res.render("login", { message });
        }
        break;

        case process.env.WAGNER_L:
        if (req.body.senha === process.env.WAGNER_S) {
          sess.login = req.body.login;
          message = "";
          res.redirect("/");
        } else {
          message = "Senha errada";
          res.render("login", { message });
        }
        break;

    default:
      message = "Usuario não existe";
      res.render("login", { message });
  }
});

module.exports = router;
