import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('Invitee', table => {
    table
      .increments('id')
      .primary()
      .unique()
      .unsigned();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table
      .string('email')
      .notNullable()
      .unique();
    table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('Invitee');
}
