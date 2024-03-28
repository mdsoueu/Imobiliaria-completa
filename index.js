const aplicacao = require('express');

const meuServidor = aplicacao();
meuServidor.use(aplicacao.json());

// Endereço
const rotasEndereco = require('./Endereco/ControladorEndereco');
meuServidor.use(rotasEndereco);

// Tipo imovel
const rotasTipoImovel = require('./Tipo Imovel/controladorTipoImovel');
meuServidor.use(rotasTipoImovel);

// Imovel
const rotasImovel = require('./Imovel/controladorImovel');
meuServidor.use(rotasImovel);

// Proprietario
const rotasProprietario = require('./Proprietario/controladorProprietario');
meuServidor.use(rotasProprietario);

// Cliente
const rotasCliente = require('./Cliente/controladorCliente');
meuServidor.use(rotasCliente);

// Corretor
const rotasCorretor = require('./Corretor/controladorCorretor');
meuServidor.use(rotasCorretor);

// Histórico 
const rotasHistorico = require('./Historicos/controladorHistorico');
meuServidor.use(rotasHistorico);

// Fotos
const rotasFotos = require('./Fotos/controladorFotos');
meuServidor.use(rotasFotos);


meuServidor.listen(4300, () => {
    console.log('Servidor na porta 4300.');
});