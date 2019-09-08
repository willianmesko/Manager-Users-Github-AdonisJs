'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListUser extends Schema {
  up () {
    this.create('developer_list', (table) => {
      table.increments()
      table.integer('list_id')
             .unsigned()
             .references('id')
             .inTable('lists')
             .onDelete('cascade')
      table.integer('developer_id')
                .unsigned()
                .references('id')
                .inTable('developers')
                .onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('developer_list')
  }
}

module.exports = ListUser
