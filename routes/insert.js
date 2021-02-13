var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    let sess = req.session;

    if (!sess.login) {
        res.redirect("/login");
    }

    global.db.distinctGrupo((err, distinctGrupo) => {
        if (err) {console.log(err);}
        
        res.render('insert', { title: "Cadastro de novas linhas 📝 - Usuário: " + sess.login, distinctGrupo})
    })

})

router.post('/', (req, res) => {
    let sess = req.session;

    if (!sess.login) {
        res.redirect("/login");
    }

    let str = req.body.contLinhas;
    let arr = str.replace(/\r\n|\n/g, " ").split(" ").map(String)

    const docs = []


    if (!req.body.grupo || req.body.grupo === '') {
        grupo = '-'
    } else {
        grupo = req.body.grupo
    }

    arr.forEach(linhas => {   
        docs.push({
            linha: linhas,
            local: req.body.local,
            razao: req.body.razao,
            plano: req.body.plano,
            status: req.body.status,
            grupo,
            obs: req.body.obs,
            motivo: req.body.motivo,
            bloqGestao: "Desbloqueado",
            extra: '-'
        }) 
    });

    global.db.findAll({linha: 1}, 500, { linha: { $in: arr } }, (e, documents) => {
        if (e) {return console.log(e);}

        if (!documents || documents.length === 0) {
            global.db.insertMany(docs, (err, result) => {
                if (err) { return console.log(err);}
                res.redirect('/')
            })
        } else {
            res.send({'Essas linhas já estão cadastradas, procedimento não realizado':documents})
        }
    })    
    
})

module.exports = router