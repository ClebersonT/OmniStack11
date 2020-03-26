const connection = require('../database/connection');

module.exports = {
    //ja tenho o metodo index, poderia criar outra requisição e listar todos os casos de uma determinada ong
    //porem é bom manter o padrão e deixar somente 5 requisições por arquivo
    //para isso vamos criar outro controller: ProfileController.js, que irá listaro "perfil" da ong, listando seus casos

    //criar paginação
    //repassar para o front o total de registros no header
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset( (page-1) *5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        //passando a qtd para o header
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response){
        const {title, description, value} = request.body;

        //pegar a ong que esta logada e esta criando o incidente
        //request.headers
        //authorization
        //acesar o id da ong
        const ong_id = request.headers.authorization;

        //const id = result[0]
        //ou posso usar desestruturação:
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        //pegar o id que vem dentro de request.params
        const { id } = request.params;
        //pegar o id da ong logada
        //preciso saber se a ong que está tentando deletar é a ong que realizou o cadastro desse incidente
        const ong_id = request.headers.authorization;    

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();//como sei que so vai retornar um registro

        //verificação
        if(incident.ong_id != ong_id){
            //401 ->  não autorizado
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();
        
        //204 - not content
        //deu sucesso, porem não tem nenhum conteudo para retornar
        return response.status(204).send();
    }
};