const Sequelize = require('sequelize');
const conexao = require('../Conexao/conexao');

const Endereco = require('../Endereco/modeloEndereco');

const Corretor = conexao.define('corretor', {
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
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

Corretor.sync({
    alter: true
});

module.exports = Corretor;