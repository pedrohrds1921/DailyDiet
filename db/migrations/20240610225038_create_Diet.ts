import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('dishes',(table)=>{
        table.increments('id').primary()
        table.uuid('user_id').references('users.id').notNullable()
        table.string('name').notNullable()
        table.string('description').notNullable()
        table.date('date').notNullable()
        table.boolean('in_diet')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('dishes')
}

