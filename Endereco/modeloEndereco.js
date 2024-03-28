/* inicaliza o Sequelize */
const Sequelize = require('sequelize');
/* importa o arquivo da conexão, na pasta conexão */
const conexao = require('../Conexao/conexao');

/* criando tabela */
const Endereco = conexao.define('endereco', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: Sequelize.CHAR(2),
        allowNull: false
    }, 
    cidade: {
        type: Sequelize.STRING(65),
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    rua: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    cep: {
        type: Sequelize.CHAR(8),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

Endereco.sync({
    alter: true
});

/* exporta o arquivo */
module.exports = Endereco;