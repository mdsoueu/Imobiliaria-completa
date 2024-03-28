const Sequelize = require('sequelize');
const conexao = require('../Conexao/conexao');

const Imovel = require('../Imovel/modeloImovel');
const Cliente = require('../Cliente/modeloCliente');
const Corretor = require('../Corretor/modeloCorretor');

const Proprietario = conexao.define('proprietario', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    percentualComissao: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    dataNegociacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    fkImovel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Imovel,
            key :  'codigo'
        }
    },
    fkCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Cliente,
            key :  'codigo'
        }
    },
    fkCorretor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Corretor,
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