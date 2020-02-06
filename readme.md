## Frontend de API Produto 

0. Os requisitos para iniciar este aplicativo serão:
1. Bifurque o repositório [backend-challeng](https://github.com/wagnerGCastro/backend-challenge)
2. Leia o readme.md e veja como instalar o projeto.
3. Subir servidor de Produto API na porta 8007, muito importante senão, não irá funicionar.
4. Execute `php artisan serve --port=8007` no projeto [backend-challeng](https://github.com/wagnerGCastro/backend-challenge)
5. Agora bifurque este repositório [frontend-challeng](https://github.com/wagnerGCastro/frontend-challenge)
6. Execute `composer install`
7. Execute `npm install` ou `yarn install`
8. Execute `php artisan serve`
9. Navegue para `http://localhost:8000`
10. Registre um usuário, após o registro será redirecionado para tela de login.
11. Faça login, entre na home e depois navegue no menu `product` para realizar cadastros.
12. Pronto agora é só testar a API, lembrando que as operações são autenticadas por token JWT da API Produto.

![alt text](https://github.com/wagnerGCastro/frontend-challenge/blob/feature/03/documentation_api/list-prod.png)
![alt text](https://github.com/wagnerGCastro/frontend-challenge/blob/feature/03/documentation_api/create.png)