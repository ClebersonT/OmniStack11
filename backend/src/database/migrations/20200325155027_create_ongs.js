
exports.up = function(knex) {
 return knex.schema.createTable('ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    //2 tamanho do texto que sera armazenando dentro
    table.string('uf', 2).notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
