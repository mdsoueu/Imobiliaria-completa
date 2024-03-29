const express = require('express');
const router = express.Router();
const Proprietario = require('./modeloProprietario');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/proprietario', async (req, res) => {
    const proprietario = await Proprietario.findAll();
    res.send(proprietario);
});

/* POST - Rota para criar um novo registro */
router.post('/proprietario/novo', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Proprietario.create({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/proprietario/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Proprietario.findOne({ where: { codigo: id } }).then(proprietario => {
        if (!proprietario) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            proprietario.update({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
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
router.delete('/proprietario/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Proprietario.findOne({ where: { codigo: id } }).then(proprietario => {
        if (!proprietario) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            proprietario.destroy().then(() => {
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