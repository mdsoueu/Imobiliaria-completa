const express = require('express');
const router = express.Router();
const Visita = require('./modeloVisita');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/visita', async (req, res) => {
    const visita = await Visita.findAll();
    res.send(visita);
});

/* POST - Rota para criar um novo registro */
router.post('/visita/novo', (requisicao, resposta) => {
    const dataVisita = requisicao.body.dataVisita;
    const visitaRealizada = requisicao.body.visitaRealizada;
    const fkImovel = requisicao.body.fkImovel;
    const fkCliente = requisicao.body.fkCliente;
    
    Visita.create({ dataVisita: dataVisita, visitaRealizada: visitaRealizada, fkImovel: fkImovel, fkCliente: fkCliente }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/visita/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const dataVisita = requisicao.body.dataVisita;
    const visitaRealizada = requisicao.body.visitaRealizada;
    const fkImovel = requisicao.body.fkImovel;
    const fkCliente = requisicao.body.fkCliente;
    

    Visita.findOne({ where: { codigo: id } }).then(visita => {
        if (!visita) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            visita.update({ dataVisita: dataVisita, visitaRealizada: visitaRealizada, fkImovel: fkImovel, fkCliente: fkCliente }).then(() => {
                resposta.send('Item atualizado.');
            }).catch(erro => {
                resposta.status(500).send('Erro ao atualizar: ' + erro);
            });
        }
    }).catch((erro) => {
        resposta.send('Ocorreu um erro ao atualizar: ' + erro);
    });

});

/* DELETE - Rota para remover um registro */
router.delete('/visita/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Visita.findOne({ where: { codigo: id } }).then(visita => {
        if (!visita) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            visita.destroy().then(() => {
                resposta.send('Item deletado.');
            }).catch(erro => {
                resposta.status(500).send('Erro ao deletar: ' + erro);
            });
        }
    }).catch((erro) => {
        resposta.send('Ocorreu um erro ao deletar: ' + erro);
    });
});

// (Opcional) Uma rota para consultar um registro por ID.
router.get('/visita/:id', async (req, res) => {
    const id = req.params.id;

    Visita.findOne({ where: { codigo: id } }).then(visita => {
            if (!visita) {
                res.status(404).send('Item não encontrado.');
            } else {
                res.send(visita);
            }
        }).catch((erro) => {
            res.status(500).send('Ocorreu um erro ao consultar o item: ' + erro);
        });
});

module.exports = router;