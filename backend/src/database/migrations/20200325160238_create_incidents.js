//caso tenha errado e queira desfazer a migration
//npx knex migrate roollback
//ele desfaz a ultima tabela que foi executada
//verificar as migrations executadas
//npx knex migrate:status
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();7


        //chave exrangeira
        table.string('ong_id').notNullable();
        //relacionamento
        table.foreign('ong_id').references('id').inTable('ongs');
    
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
