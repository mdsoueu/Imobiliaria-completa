const express = require('express');
const router = express.Router();
const Historico = require('./modeloHistorico');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/historico', async (req, res) => {
    const historico = await Historico.findAll();
    res.send(historico);
});

/* POST - Rota para criar um novo registro */
router.post('/historico/novo', (requisicao, resposta) => {
    const percentualComissao = requisicao.body.percentualComissao;
    const dataNegociacao = requisicao.body.dataNegociacao;
    const fkImovel = requisicao.body.fkImovel;
    const fkCliente = requisicao.body.fkCliente;
    const fkCorretor = requisicao.body.fkCorretor;

    Proprietario.create({ percentualComissao: percentualComissao, dataNegociacao: dataNegociacao, fkImovel: fkImovel, fkCliente: fkCliente, fkCorretor: fkCorretor }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/historico/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const percentualComissao = requisicao.body.percentualComissao;
    const dataNegociacao = requisicao.body.dataNegociacao;
    const fkImovel = requisicao.body.fkImovel;
    const fkCliente = requisicao.body.fkCliente;
    const fkCorretor = requisicao.body.fkCorretor;

    Historico.findOne({ where: { codigo: id } }).then(historico => {
        if (!historico) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            historico.update({ percentualComissao: percentualComissao, dataNegociacao: dataNegociacao, fkImovel: fkImovel, fkCliente: fkCliente, fkCorretor: fkCorretor }).then(() => {
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
router.delete('/historico/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Historico.findOne({ where: { codigo: id } }).then(historico => {
        if (!historico) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            historico.destroy().then(() => {
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