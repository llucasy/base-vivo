var express = require('express')
var router = express.Router()
var xlsx = require("xlsx");

router.get('/', (req, res) => {
    var sess = req.session;

    if (!sess.login) {
      res.redirect("/login");
    }

    global.db.findAll({ log: 0, _id: 0, extra: 0 }, 0, {}, (e, docs) => {
        if (e) {console.log(e)}

        let newWB = xlsx.utils.book_new();
        let newWS = xlsx.utils.json_to_sheet(docs);
        xlsx.utils.book_append_sheet(newWB, newWS, "gestaoLinhas");

        xlsx.writeFile(newWB, "public/gestaoLinhas.xlsx");

        res.redirect("/gestaoLinhas.xlsx");
    })
})

module.exports = router