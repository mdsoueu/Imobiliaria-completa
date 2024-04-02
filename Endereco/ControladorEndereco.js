/* inicaliza o Express */
const express = require('express');
/*  */
const router = express.Router();
/* importa o arquivo */
const Endereco = require('./modeloEndereco');

/* Métodos */
/* GET - Rota para consultar todos os registros */
router.get('/endereco', async (requisicao, resposta) => {
    const endereco = await Endereco.findAll();
    resposta.send(endereco);
});

/* POST - Rota para criar um novo registro */
router.post('/endereco/novo', (requisicao, resposta) => {
    const estado = requisicao.body.estado;
    const cidade = requisicao.body.cidade;
    const bairro = requisicao.body.bairro;
    const rua = requisicao.body.rua;
    const complemento = requisicao.body.complemento;
    const cep = requisicao.body.cep;

    Endereco.create({ estado: estado, cidade: cidade, bairro: bairro, rua: rua, complemento: complemento, cep: cep }).then(() => {
        resposta.send('Cadastrado feito.');
    }).catch((erro) => {
        resposta.send('Ocorreu erro: ' + erro);
    })

});

/* PUT - Rota para atualizar um registro */
router.put('/endereco/atualizar/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;
    const estado = requisicao.body.estado;
    const cidade = requisicao.body.cidade;
    const bairro = requisicao.body.bairro;
    const rua = requisicao.body.rua;
    const complemento = requisicao.body.complemento;
    const cep = requisicao.body.cep;

    Endereco.findOne({ where: { codigo: id } }).then(endereco => {
        if (!endereco) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            endereco.update({ estado: estado, cidade: cidade, bairro: bairro, rua: rua, complemento: complemento, cep: cep }).then(() => {
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
router.delete('/endereco/excluir/:id', (requisicao, resposta) => {
    const id = requisicao.params.id;

    Endereco.findOne({ where: { codigo: id } }).then(endereco => {
        if (!endereco) {
            resposta.status(404).send('Item não encontrado.');
        } else {
            endereco.destroy().then(() => {
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
router.get('/endereco/:id', async (req, res) => {
    const id = req.params.id;

    Endereco.findOne({ where: { codigo: id } }).then(endereco => {
            if (!endereco) {
                res.status(404).send('Endereço não encontrado.');
            } else {
                res.send(endereco);
            }
        }).catch((erro) => {
            res.status(500).send('Ocorreu um erro ao consultar o endereço: ' + erro);
        });
});

module.exports = router;