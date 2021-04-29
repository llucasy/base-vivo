var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    let sess = req.session;

    if (!sess.login) {
        res.redirect("/login");
    }

    const DDD = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99']

    global.db.findAll({linha: 1, local: 1, grupo: 1, plano: 1}, 0, { local: { $in: ['Estoque_CT']} }, (e, docs) => {
        if (e) {return console.log(e);}

        let estoque = {}
        estoque.data = []

        let pulmao = {}
        pulmao.data = []

        let qtData = 0

        DDD.forEach(D => {
            qtData = 0
            docs.forEach(doc => {
                if (doc['local'] === 'Estoque_CT') {
                    if (doc['linha'][0] + doc['linha'][1] === D) {
                        qtData += 1
                    }
                }
                
            })
            estoque.data.push(qtData)
            // estoque.labels.push(D)
        });

        DDD.forEach(D => {
            qtData = 0
            docs.forEach(doc => {
                if (doc['grupo'] === 'Pulmão') {
                    if (doc['linha'][0] + doc['linha'][1] === D) {
                        qtData += 1
                    }
                }
                
            })
            pulmao.data.push(qtData)
            // pulmao.labels.push(D)
        });

        let dados = {}
        dados.data = []

        let qtDadosEstoque = 0
        let qtDadosPulmao = 0

        docs.forEach(doc => {
            if ((doc['plano'] === 'Dados3GB' || doc['plano'] === 'Dados5GB' || doc['plano'] === 'Dados10GB') && doc['local'] === 'Estoque_CT') {
                qtDadosEstoque ++
            }
            if ((doc['plano'] === 'Dados3GB' || doc['plano'] === 'Dados5GB' || doc['plano'] === 'Dados10GB') && doc['grupo'] === 'Pulmão') {
                qtDadosPulmao ++
            }
        })

        dados.data.push(qtDadosEstoque)
        dados.data.push(qtDadosPulmao)

        res.render('dashboard', {
            estoqueData: estoque.data, 
            pulmaoData: pulmao.data,
            dadosData: dados.data
        })
    })


})

module.exports = router