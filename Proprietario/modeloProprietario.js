const Sequelize = require('sequelize');
const conexao = require('../Conexao/conexao');

const Endereco = require('../Endereco/modeloEndereco');

const Proprietario = conexao.define('proprietario', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: Sequelize.CHAR(14),
        allowNull: true,
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fkEndereco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Endereco,
            key :  'codigo'
        }
    }
}, {
    timestamps: false
});

Proprietario.sync({
    alter: true
});

module.exports = Proprietario;