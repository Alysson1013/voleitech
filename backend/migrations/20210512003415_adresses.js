
exports.up = function(knex) {
    return knex.schema.createTable('adresses', table => {
        table.increments('id').primary()
        table.integer('colab_id').unsigned()
        table.boolean('main').notNull()
        table.string('cep', 8).notNull()
        table.string('uf', 2).notNull()
        table.string('district', 200).notNull()
        table.string('road', 100).notNull()
        table.integer('number').notNull()
        table.string('complement', 100).notNull()
        table.string('describe', 500).notNull()

        table.foreign('colab_id').references('collaborators.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adresses')
};


