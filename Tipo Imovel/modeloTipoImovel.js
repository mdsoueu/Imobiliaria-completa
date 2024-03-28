/* inicaliza o Sequelize */
const Sequelize = require('sequelize');
/* importa o arquivo da conexão, na pasta conexão */
const conexao = require('../Conexao/conexao');

const TipoImovel = conexao.define('tipoImovel', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
});

TipoImovel.sync({
    alter: true
});

/* exporta o arquivo */
module.exports = TipoImovel;