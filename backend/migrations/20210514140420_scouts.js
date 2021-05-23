
exports.up = function(knex) {
    return knex.schema.createTable('scouts', table => {
        table.increments('id').primary()
        table.string('name', 30).notNull().unique()
        table.integer('v_floating_serve')
        table.integer('v_floating_serve_points')
        table.integer('v_floating_serve_mistake')
        table.integer('v_trip_serve')
        table.integer('v_trip_serve_points')
        table.integer('v_trip_serve_mistake')
        table.integer('v_attack')
        table.integer('v_attack_points')
        table.integer('v_attack_mistake')
        table.integer('v_dripping_point')
        table.integer('v_box_point')
        table.integer('v_block')
        table.integer('v_block_mistake')
        table.integer('v_block_used_mistake')
        table.integer('v_block_points')
        table.integer('v_general_passes')
        table.integer('v_pass_mistake')
        table.integer('v_pass_a')
        table.integer('v_pass_b')
        table.integer('v_pass_c')
        table.integer('v_defense_general')
        table.integer('v_defense_mistake')
        table.integer('v_defense_a')
        table.integer('v_defense_b')
        table.integer('v_defense_c')
        table.integer('v_lifting')
        table.integer('v_lifting_mistake')
        table.integer('v_lifting_correct')
        table.integer('v_initiative')
        table.integer('v_initiative_lack')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('scouts')
};
