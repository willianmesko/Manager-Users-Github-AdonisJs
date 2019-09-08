'use strict'

const Model = use('Model')
class Developer extends Model {

  user () {
    return this.belongsTo('App/Models/User')
  }

  lists () {
    return this.belongsToMany('App/Models/List')
  }

  tags () {
    return this.belongsToMany('App/Models/Tag')
                .pivotTable('developer_tags')
  }

}

module.exports = Developer
