'use strict'
const Model = use('Model');
const Tag = use('App/Models/Tag');

class DeveloperTag extends Model {
  static get deleteTimestamp () {
    return null
  }

  static addTagUser(tags, devExists ) {
    const tagsSize = tags.split(',');

    tagsSize.map(async (tagName) => {
         const tag = await Tag.findBy('name', tagName);

         if(!tag) {
          const newTag = await Tag.create({name: tagName});
          await this.create({developer_id: devExists.id, tag_id: newTag.id});
        }
      else {
         const tagAlreadyInDev = this.query()
                                  .select('tag_id', tag.id)
                                  .andWhere('developer_id', devExists.id)
                                  .first();
         if(!tagAlreadyInDev)
           await this.create({developer_id: devExists.id, tag_id: tag.id});
           }
    });
  }
}

module.exports = DeveloperTag
