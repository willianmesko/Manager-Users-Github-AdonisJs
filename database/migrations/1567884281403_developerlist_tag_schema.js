'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeveloperTagSchema extends Schema {
  up () {
    this.create('developer_tags', (table) => {
      table.increments()
      table.integer('developer_id')
          .unsigned()
          .references('id')
          .inTable('developers')
          .onDelete('cascade');

    table.integer('tag_id')
         .unsigned()
         .references('id')
         .inTable('tags')
         .onDelete('cascade');
         table.timestamps()
    })
  }

  down () {
    this.drop('developer_tags')
  }
}

module.exports = DeveloperTagSchema
