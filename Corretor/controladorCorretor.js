const express = require('express');
const router = express.Router();
const Corretor = require('./modeloCorretor');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/corretor', async (req, res) => {
    const corretor = await Corretor.findAll();
    res.send(corretor);
});

/* POST - Rota para criar um novo registro */
router.post('/corretor/novo', (requisicao, resposta) => {
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Corretor.create({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/corretor/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const nome = requisicao.body.nome;
    const cpf = requisicao.body.cpf;
    const cnpj = requisicao.body.cnpj;
    const dataNascimento = requisicao.body.dataNascimento;
    const fkEndereco = requisicao.body.fkEndereco;

    Corretor.findOne({ where: { codigo: id } }).then(corretor => {
        if (!corretor) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            corretor.update({ nome: nome, cpf: cpf, cnpj: cnpj, dataNascimento: dataNascimento, fkEndereco: fkEndereco }).then(() => {
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
router.delete('/corretor/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Corretor.findOne({ where: { codigo: id } }).then(corretor => {
        if (!corretor) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            corretor.destroy().then(() => {
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
router.get('/corretor/:id', async (req, res) => {
    const id = req.params.id;

    Corretor.findOne({ where: { codigo: id } }).then(corretor => {
            if (!corretor) {
                res.status(404).send('Corretor não encontrado.');
            } else {
                res.send(corretor);
            }
        }).catch((erro) => {
            res.status(500).send('Ocorreu um erro ao consultar o corretor: ' + erro);
        });
});

module.exports = router;