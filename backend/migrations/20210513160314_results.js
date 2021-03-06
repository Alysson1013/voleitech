
exports.up = function(knex) {
    return knex.schema.createTable('results', table => {
        table.increments('id').primary()
        table.integer('general_points').notNull()
        table.integer('n_floating_serve')
        table.integer('n_floating_serve_points')
        table.integer('n_floating_serve_mistake')
        table.integer('n_trip_serve')
        table.integer('n_trip_serve_points')
        table.integer('n_trip_serve_mistake')
        table.integer('n_attack')
        table.integer('n_attack_points')
        table.integer('n_attack_mistake')
        table.integer('n_dripping_point')
        table.integer('n_box_point')
        table.integer('n_block')
        table.integer('n_block_mistake')
        table.integer('n_block_used_mistake')
        table.integer('n_block_points')
        table.integer('n_general_passes')
        table.integer('n_pass_mistake')
        table.integer('n_pass_a')
        table.integer('n_pass_b')
        table.integer('n_pass_c')
        table.integer('n_defense_general')
        table.integer('n_defense_mistake')
        table.integer('n_defense_a')
        table.integer('n_defense_b')
        table.integer('n_defense_c')
        table.integer('n_lifting')
        table.integer('n_lifting_mistake')
        table.integer('n_lifting_correct')
        table.integer('n_initiative')
        table.integer('n_initiative_lack')
        table.string('describe', 500)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('results')
};
