'use strict'
const List = use('App/Models/List');
const Database = use('Database');

class ListController {

  async index ({ response, auth }) {
    const {id} = auth.user

    const lists = await List.query()
           .select('id','name','user_id')
           .with('owner', (builder) => {
              builder.select('id','email')
            })
            .where('user_id', id)
           .fetch();

          if(lists.rows.length < 1)
            return response.status(400).send({messsage: 'Você não possui nenhuma lista cadastrada'});

      response.send(lists);

    }


  async store ({ request, response, auth}) {
    const {id: user_id} = auth.user;
    const {name} = request.body;

    const listExists = await await List.query()
                                      .where('name', name)
                                      .andWhere('user_id', user_id)
                                      .first();

    if(listExists)
        return response.status(400).send({error: 'Você já possui uma lista com o mesmo nome'});

    const list = await List.create({name, user_id});

    return response.send({
      message:'Lista criada com sucesso.',
      list
    });
  }


  async show ({ params, response, auth}) {
    const {id} = params;
    const {id: user_id} = auth.user;
    const listExists = await List.query()
                                  .where('id',id)
                                  .andWhere('user_id',user_id)
                                  .first();
    if(!listExists)
        return response.status(400).send({error: 'Lista não encontrada'});

   const list = await List.query()
        .with('owner', (builder) => {
          builder.select('id','email')
        })
        .with('devs', (builder) => {
          builder.select('id','login','name','html_url')
        .with('tags', (builder) => {
          builder.select('id','name')
        })
        })
        .where('id', id)
        .andWhere('user_id',user_id)
        .fetch();

        return response.send(list);
}


  async update ({ params, request, response, auth }) {
    const {id} = params;
    const {name} = request.body;
    const {id: user_id} = auth.user;

    const list = await List.query()
                          .where('id',id)
                          .andWhere('user_id',user_id)
                          .first();

    if(!list)
        return response.status(400).send({error: 'Lista não encontrada'});

   const existListEqual =  await List.query()
                                    .where('name',name)
                                    .andWhere('user_id',user_id)
                                    .first();


  if(existListEqual)
       return response.status(400).send({error: 'Você já possui uma lista com o mesmo nome'});

    if(list.name != name) {
        list.name = name;

        await list.save();

        return response.send({message:'Lista atualizada'});
     }



  }


  async destroy ({ params, response, auth }) {
    const {id} = params;
    const {id: user_id} = auth.user;
    const list = await List.query()
                       .where('id',id)
                       .andWhere('user_id',user_id)
                       .first();

    if(!list)
        return response.status(400).send({error:'Lista não encontrada'});

        await list.delete();

        return response.send({message:'Lista excluida com sucesso.'})
  }
}

module.exports = ListController
