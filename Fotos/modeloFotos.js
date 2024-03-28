const Sequelize = require('sequelize');
const conexao = require('../Conexao/conexao');

const Imovel = require('../Imovel/modeloImovel');

const Fotos = conexao.define('proprietario', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    chaveAws: {
        type: Sequelize.CHAR(36),
        allowNull: true,
    },
    fkImovel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Imovel,
            key :  'codigo'
        }
    }
}, {
    timestamps: false
});

Fotos.sync({
    alter: true
});

module.exports = Fotos;