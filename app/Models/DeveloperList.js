'use strict'


const Model = use('Model')

class DeveloperList extends Model {
  static get table () {
    return 'developer_list'
  }

  tags() {
    return this.belongsToMany('App/Models/Developer');
  }
}

module.exports = DeveloperList
