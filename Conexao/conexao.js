const Sequelize = require('sequelize');

const conexao = new Sequelize('imobiliaria', 'root', 'root', {
    /* nome do BD, user, senha  */
    host: 'localhost',
    dialect: 'mysql'
});

conexao.authenticate().then(() => {
    console.log('Conectado com sucesso.');
}).catch((erro) => {
    console.log('Erro: ', erro);
});

module.exports = conexao;