Link da API no heroku : https://manager-github-users.herokuapp.com/


<h1>ENDPOINTS</h1> <br>

 <strong>USERS </strong>
POST /users 
no corpo da requisição recebe "email, cpf, senha, admin(por default é 0)"

GET /users
lista todos os usuários cadastrados

GET /users/:id
 retorna todos os usuários cadastrados mais as listas criadas por ele
 
 
 
 <strong>LOGIN </strong>
  POST /sessions
    no corpo da requisição recebe "email, senha" retorna o token jwt do usuário
  

<strong>DEVELOPERS (Gitghub Users)</strong>
 POST /devs
    no corpo da requisição recebe "username" do usuário no github (Somente admins podem adicionar usuários do github)
    
 GET /devs    
    lista todos desenvolvedores (user github) cadastrados
    
 GET /devs/:username   
    Procura por um usúario no github
    
    
    
 <strong> LIST  </strong>
  POST /lists
    no corpo da requisição recebe "name" (Somente usuários comuns podem criar listas)
    
  PUT /lists/:id
    atualiza uma lista criada pelo usúario logado
    
  DELETE /lists/:id
    deleta uma lista criada pelo usuário logado
    
  GET /lists/:id  
    retorna uma lista com todos os desenvolvedores que pertencem a ela, junto com todas as tags vinculadas ao dev
    
 GET /lists   
     retorna todas as listas criadas pelo usuário logado
     
 POST list/:id/add
    Adiciona um desenvolvedor (usuário github na lista) 
    no corpo da requisição recebe "dev" sendo o username do dev no github
    
 DELETE list/:list_id/delete/:dev_id
      Deleta um desenvolvedor da lista 
  
    
    
    
  
