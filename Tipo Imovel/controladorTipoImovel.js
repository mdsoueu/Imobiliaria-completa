/* inicaliza o Express */
const express = require('express');
const router = express.Router();
/* importa o arquivo */
const TipoImovel = require('./modeloTipoImovel');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/tipoImovel', async (requisicao, resposta) => {
    const tipoImovel = await TipoImovel.findAll();
    resposta.send(tipoImovel);
});

/* POST - Rota para criar um novo registro */
router.post('/tipoImovel/novo', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao;
    
    TipoImovel.create({ descricao: descricao }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })
    
});

/* PUT - Rota para atualizar um registro */
router.put('/tipoImovel/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const descricao = requisicao.body.descricao;
    
    TipoImovel.findOne({ where: { codigo: id } }).then(tipoImovel => {
        if (!tipoImovel) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            tipoImovel.update({ descricao: descricao }).then(() => {
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
router.delete('/tipoImovel/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    TipoImovel.findOne({ where: { codigo: id } }).then(tipoImovel => {
        if (!tipoImovel) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            tipoImovel.destroy().then(() => {
                resposta.send('Item deletado.');
            }).catch(erro => {
                resposta.status(500).send('Erro ao deletar: ' + erro);
            });
        }
    }).catch((erro) => {
        resposta.send('Ocorreu um erro ao deletar: ' + erro);
    });
});

module.exports = router;