var express = require('express'); 
var router = express.Router();

router.get('/', function(req, res, next) {  
    res.render('new', { title: 'Novo Cadastro', customer: {_id: '', nome: '', idade:0, uf: ''} }); 
});

/* Alterar **/
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    global.db.findOne(id, (err, customer) => {
        if(err) { return console.log(err); }
        res.render('new', {title: 'Editar Cadastro', customer});
    })
});

/* POST new page. */
router.post('/', function(req, res, next) {
    var id = req.body.id;
    var nome = req.body.nome;
    var idade = parseInt(req.body.idade);
    var uf = req.body.uf;

    if(id){
        global.db.updateOne(id, {nome, idade, uf}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/');
        })
     }else {
         global.db.insert({nome, idade, uf}, (err, result) => {
             if(err) { return console.log(err); }
             res.redirect('/');
         })
     }
});

module.exports = router;
