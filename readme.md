## Frontend de API Produto 

0. Os requisitos para iniciar este aplicativo serão:
1. Bifurque o repositório [backend-challeng](https://github.com/wagnerGCastro/backend-challenge)
2. Leia o readme.md e veja como instalar o projeto.
3. Subir servidor de Produto API na porta 8007 por padrão, muito importante senão, não irá funcionar.
4. Execute `php artisan serve --port=8007` no projeto [backend-challeng](https://github.com/wagnerGCastro/backend-challenge)
5. Ou incluir no arquivo .env a url que deseja usar por exemplo. Tem que terminar com `/api` no final.
    #### 
    ``` txt
     APP_API_URL=http://backend.wagnercastro.tk/api
    ```
6. Agora bifurque este repositório [frontend-challeng](https://github.com/wagnerGCastro/frontend-challenge)
7. Execute `composer install`
8. Execute `npm install` ou `yarn install`
9. Execute `php artisan serve`
10. Navegue para `http://localhost:8000`
11. Registre um usuário, após o registro será redirecionado para tela de login.
12. Faça login, entre na home e depois navegue no menu `product` para realizar cadastros.
13. Pronto agora é só testar a API, lembrando que as operações são autenticadas por token JWT da API Produto.

#
![alt text](https://github.com/wagnerGCastro/frontend-challenge/blob/master/documentation_api/1-home.png?v=1.0)
#
![alt text](https://github.com/wagnerGCastro/frontend-challenge/blob/master/documentation_api/2-product-list.png?v=1.0)
#
![alt text](https://github.com/wagnerGCastro/frontend-challenge/blob/master/documentation_api/3-product-create.png?v=1.0)