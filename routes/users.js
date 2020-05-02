var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  global.db.contar((err, test) => {
    if (err) {
      console.log(err);
    }
    res.send("respond with a resource" + test);
  });
});

module.exports = router;
