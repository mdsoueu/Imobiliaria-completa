const express = require('express');
const router = express.Router();
const Cliente = require('./modeloCliente');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/cliente', async (req, res) => {
    const cliente = await Cliente.findAll();
    res.send(cliente);
});

/* POST - Rota para criar um novo registro */
router.post('/cliente/novo', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Cliente.create({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/cliente/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Cliente.findOne({ where: { codigo: id } }).then(cliente => {
        if (!cliente) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            cliente.update({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
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
router.delete('/cliente/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Cliente.findOne({ where: { codigo: id } }).then(cliente => {
        if (!cliente) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            cliente.destroy().then(() => {
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
router.get('/cliente/:id', async (req, res) => {
    const id = req.params.id;

    Cliente.findOne({ where: { codigo: id } })
        .then(cliente => {
            if (!cliente) {
                res.status(404).send('Cliente não encontrado.');
            } else {
                res.send(cliente);
            }
        })
        .catch((erro) => {
            res.status(500).send('Ocorreu um erro ao consultar o cliente: ' + erro);
        });
});


module.exports = router;