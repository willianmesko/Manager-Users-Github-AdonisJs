'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DevelopersSchema extends Schema {
  up () {
    this.create('developers', (table) => {
      table.increments()
      table.string('login', 100).notNullable().unique()
      table.string('name', 100).notNullable()
      table.text('bio')
      table.string('location', 60)
      table.string('html_url', 100).notNullable()
      table.integer('admin_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('developers')
  }
}

module.exports = DevelopersSchema
