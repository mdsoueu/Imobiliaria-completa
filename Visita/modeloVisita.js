const Sequelize = require('sequelize');
const conexao = require('../Conexao/conexao');

const Cliente = require('../Cliente/modeloCliente');
const Imovel = require('../Imovel/modeloImovel');

const Visita = conexao.define('visita', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    dataVisita: {
        type: Sequelize.DATE,
        allowNull: false,
    }, 
    visitaRealizada: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    fkImovel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Imovel,
            key: 'codigo'
        },
        onDelete: 'CASCADE'
    },
    fkCliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: Cliente,
            key: 'codigo'
        },
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
});

Visita.sync({
    force: true
});

module.exports = Visita;