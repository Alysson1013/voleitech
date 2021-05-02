
exports.up = function (knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id').primary()
        table.string('nome', 50).notNull()
        table.string('email', 80).notNull().unique()
        table.date('dt_nasc').notNull()
        table.string('n_inscricao_t').notNull().unique()
        table.string('descricao', 500)
        table.string('senha', 500).notNull()
        table.integer('papel').defaultTo(0)
        table.timestamp('dt_criacao').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuario')
};
