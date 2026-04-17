# CRUD de Produtos com Flask

Aplicação web completa de CRUD (Criar, Ler, Atualizar e Excluir) feita com Python e Flask.

## Link online

Acesse o projeto em produção:  
https://crud-python-flask-1.onrender.com/

## Funcionalidades

- Criar produto
- Listar produtos
- Editar produto
- Excluir produto
- Validação de dados (nome obrigatório e preço maior que zero)
- Mensagens de sucesso e erro na tela

## Tecnologias usadas

- Python
- Flask
- Flask-SQLAlchemy
- SQLite (desenvolvimento local)
- PostgreSQL (produção no Render)
- HTML
- CSS
- JavaScript
- Git e GitHub

## Estrutura do projeto

- `app.py` -> arquivo principal da aplicação
- `models.py` -> modelo do banco de dados
- `routes.py` -> rotas da aplicação (CRUD)
- `templates/index.html` -> interface da aplicação
- `static/app.js` -> lógica do frontend
- `static/style.css` -> estilos visuais
- `requirements.txt` -> dependências do projeto

## Como rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/mateusimobgoncalo-afk/crud-python-flask.git
cd crud-python-flask
