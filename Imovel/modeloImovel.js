/* inicaliza o Sequelize */
const Sequelize = require('sequelize');
/* importa o arquivo da conexão, na pasta conexão */
const conexao = require('../Conexao/conexao');

/*importa arquivos para poder criar as FK */
const TipoImovel = require('../Tipo Imovel/modeloTipoImovel');
const Endereco = require('../Endereco/modeloEndereco');

const Imovel = conexao.define('imovel', {
    codigo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING(400),
        allowNull: false
    },
    areaMetros: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    fkTipoImovel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: TipoImovel,
            key: 'codigo'
        }
    },
    fkEndereco: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Endereco,
            key: 'codigo'
        }
    }
}, {
    timestamps: false
});

Imovel.sync({
    force: true
});

/* exporta o arquivo */
module.exports = Imovel;