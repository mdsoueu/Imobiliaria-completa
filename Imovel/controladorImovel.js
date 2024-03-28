/* inicaliza o Express */
const express = require('express');
/*  */
const router = express.Router();
/* importa o arquivo */
const Imovel = require('./modeloImovel');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/imovel', async (requisicao, resposta) => {
    const imovel = await Imovel.findAll();
    resposta.send(imovel);
});

/* POST - Rota para criar um novo registro */
router.post('/imovel/novo', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao;
    const areaMetros = requisicao.body.areaMetros;
    const fkTipoImovel = requisicao.body.fkTipoImovel;
    const fkEndereco = requisicao.body.fkEndereco;
    
    Imovel.create({ descricao: descricao, areaMetros: areaMetros, fkTipoImovel: fkTipoImovel, fkEndereco: fkEndereco }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })
    
});

/* PUT - Rota para atualizar um registro */
router.put('/imovel/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const descricao = requisicao.body.descricao;
    const areaMetros = requisicao.body.areaMetros;
    const fkTipoImovel = requisicao.body.fkTipoImovel;
    const fkEndereco = requisicao.body.fkEndereco;

    Imovel.findOne({ where: { codigo: id } }).then(imovel => {
        if (!imovel) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            imovel.update({ descricao: descricao, areaMetros: areaMetros, fkTipoImovel: fkTipoImovel, fkEndereco: fkEndereco }).then(() => {
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
router.delete('/imovel/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Imovel.findOne({ where: { codigo: id } }).then(imovel => {
        if (!imovel) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            imovel.destroy().then(() => {
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