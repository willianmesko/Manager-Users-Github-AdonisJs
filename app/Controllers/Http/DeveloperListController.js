'use strict'
const List = use('App/Models/List');
const Dev = use('App/Models/Developer');
const DevList = use('App/Models/DeveloperList')
const DevTag = use('App/Models/DeveloperTag');
const Database = use('Database');


class DeveloperList {


  async store ({ params, request, response, auth }) {
    const {id : list_id} = params;
    const {dev, tags} = request.body;
    const {id : user_id} = auth.user;


   const listExists = await List.query()
                      .where('id', list_id)
                      .andWhere('user_id',user_id)
                      .first();
    if(!listExists)
        return response.status(400).send({error: 'Lista não encontrada'});

    const devExists = await Dev.findBy('login', dev);

    if(!devExists)
        return response.status(400).send({error: 'Desenvolvedor não encontrado'});


    const devExistsInList =  await Database.from('developer_list')
                                       .where('list_id', list_id)
                                       .andWhere('developer_id', devExists.id);

    if(devExistsInList.length >= 1)
       return response.status(400).send({error: 'Desenvolvedor já cadastrado na lista'});

   const list = await DevList.create({list_id, developer_id: devExists.id});

   response.send({list});

    if(tags) {
        DevTag.addTagUser(tags, devExists)
    }
}

  async destroy ({ params, response, auth }) {

    const {id : list_id, dev_id} = params;
    const {id: user_id} = auth.user;


    const listExists = await List.query()
                .where('id', list_id)
                .andWhere('user_id',user_id)
                .first();

    if(!listExists)
        return response.status(400).send({error: 'Lista não encontrada'});

    const userExistsInList =  await DevList.query()
                                       .where('list_id', list_id)
                                       .andWhere('developer_id', dev_id)
                                       .first();

    if(!userExistsInList)
       return response.status(400).send({error: 'Usuário não encontrado nesta lista'});

       await Database.table('developer_list')
                  .where('developer_id', dev_id)
                  .andWhere('list_id', list_id)
                  .delete();

       response.send({message: 'Usuário removido da lista'})

  }
}

module.exports = DeveloperList
