/* inicaliza o Express */
const express = require('express');

const router = express.Router();
/* importa o arquivo */
const Fotos = require('./modeloFotos');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/fotos', async (requisicao, resposta) => {
    const fotos = await Fotos.findAll();
    resposta.send(fotos);
});

/* POST - Rota para criar um novo registro */
router.post('/fotos/novo', (requisicao, resposta) => {
    const chaveAws = requisicao.body.chaveAws;
    const fkImovel = requisicao.body.fkImovel;

    Fotos.create({ chaveAws: chaveAws, fkImovel: fkImovel }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/fotos/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const chaveAws = requisicao.body.chaveAws;
    const fkImovel = requisicao.body.fkImovel;

    Fotos.findOne({ where: { codigo: id } }).then(foto => {
        if (!foto) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            foto.update({ chaveAws: chaveAws, fkImovel: fkImovel }).then(() => {
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
router.delete('/fotos/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Fotos.findOne({ where: { codigo: id } }).then(foto => {
        if (!foto) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            foto.destroy().then(() => {
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
router.get('/fotos/:id', async (req, res) => {
    const id = req.params.id;

    Fotos.findOne({ where: { codigo: id } }).then(fotos => {
            if (!fotos) {
                res.status(404).send('Foto não encontrado.');
            } else {
                res.send(fotos);
            }
        }).catch((erro) => {
            res.status(500).send('Ocorreu um erro ao consultar: ' + erro);
        });
});

module.exports = router;