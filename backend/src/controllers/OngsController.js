//utilizado para criptografia
//mas vai ser usado para gerar um id Rand
//esse package vem junto com o node
const cryto = require('crypto');

const connection = require('../database/connection');
module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    async create(request, response){
          //const data = request.body;
    //posso fazer a desestruturação
    //para fazer com que usuario mande somente o que eu desejo
    const {name, email, whatsapp, city, uf } = request.body;
    
    //gerar 4 bytes de caracteres hexadecimal
    const id = cryto.randomBytes(4).toString('HEX');

    //para fazer a inserção preciso da conexao com o banco de dados
    //criei um arquivo connection. js dentro de database

    // como essa inserção pode demorar um pouco, nesse caso passo um await e digo que essa função é async
    //que  retornara o resultado somente depois que o insert foi finalizado
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    //retorna o id da ong, que usara para se conectar com a aplicação
    return response.json({ id });
    }
}