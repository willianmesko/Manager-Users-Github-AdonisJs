Link da API no heroku : https://manager-github-users.herokuapp.com/


<h1>ENDPOINTS</h1>

 <strong>USERS </strong>  <br>
POST /users -
no corpo da requisição recebe "email, cpf, senha, admin - caso o usuário seja admin passar o valor 1, por default é 0 

GET /users -
lista todos os usuários cadastrados

GET /users/:id -
 retorna todos os usuários cadastrados mais as listas criadas por ele
 
 
 
 <strong>LOGIN </strong> <br>
  POST /sessions -
    no corpo da requisição recebe "email, senha" retorna o token jwt do usuário
  

<strong>DEVELOPERS (Gitghub Users)</strong> <br>
 POST /devs -
    no corpo da requisição recebe "username" do usuário no github (Somente admins podem adicionar usuários do github)
    
 GET /devs -
    lista todos desenvolvedores (user github) cadastrados
    
 GET /devs/:username -
    Procura por um usúario no github
    
    
    
 <strong> LIST  </strong> <br>
  POST /lists -
    no corpo da requisição recebe "name" (Somente usuários comuns podem criar listas)
    
  PUT /lists/:id -
    Atualiza uma lista criada pelo usuário logado, recebe "name" com o novo nome da lista no corpo da requisição
    
  DELETE /lists/:id -
    deleta uma lista criada pelo usuário logado
    
  GET /lists/:id -
    retorna uma lista com todos os desenvolvedores que pertencem a ela, junto com todas as tags vinculadas ao dev
    
 GET /lists -
     retorna todas as listas criadas pelo usuário logado
     
 POST list/:id/add -
    Adiciona um desenvolvedor (usuário github ) na lista
    no corpo da requisição recebe "dev" sendo o username do dev no github <br>
    rebece "tags (não obrigatório)" para adicionar uma tag ao usuário da lista. <br>
    Ao adicionar mais de uma tag separar as tags por ",".
    
 DELETE list/:list_id/delete/:dev_id -
      Deleta um desenvolvedor da lista 
  
    
    
    
  
