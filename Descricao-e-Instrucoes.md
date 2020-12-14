<div style="text-align: center;">
  <h1>
    Github profile indexer
  </h1>
</div>

## Detalhes da solução

<!-- TODO: ver se faz sentido manter -->

### Perfil de usuário
O perfil de usuário abrange os requisitos 1, 2 e 3. De forma breve, a modelo `Profile` recebe como argumentos o nome e a URL do Github e, durante o ciclo `before_validation`, executa o webcrapping do perfil, coletando as outras informações além de validar a URL e se a página é ou não um perfil de usuário no Github. Neste ponto também são encurtadas as URLs de perfil e de imagem de perfil. Após a validação dos dados coletados, o objeto então é processado.

O encurtamento de URLs é feito a partir do serviço `tinyurl` a partir da gem `shorturl`, enquanto a busca é feita com o auxílio de funcionalidades de pesquisa de texto presentes no postgres com a gem `pg_search`.

#### Atualização de perfil por re-escaneamento
Por meio do endpoint de `update` do profile é possível executar esta funcionalidade, a diferença é que devem ser passados os valores de nome e URL já presentes no perfil. Decidi manter desta forma pois no final esta funcionalidade é uma atualização sem edição.

#### Busca e interface de usuário
Como dito anteriormente, a busca ocorre com a ajuda da gem `pg_search`, com ela é definido um escopo de busca que abrange os campos de nome, nome de usuário, localização e organizações. A busca é feita pelo prefixo de qualquer palavra presentes nestes campos.

Os resultados da pesquisa são exibidos em lista, abaixo da barra de busca, em cada entrada têm-se  o nome de usuário, a imagem de usuário, o username e a url do perfil encurtada além das ações de editar, vizualizar e deletar aquele perfil. Essas opções, assim como todas as informações coletadas estão tambem presentes na página de visualização do perfil.

Em todas as páginas é exibido um botão de adicionar novo perfil, e tanto ele quanto os botões de edição e deleção, exibem uma modal com formulários ou confirmações.

## Requisitos e implementação

### Requisitos
| ID | Nome | Descrição |
| -- | ---- | --------- |
| 1 | Cadastro de perfis | Deve-se haver uma página para cadastrar um nome e o endereço da página de perfil do Github desse novo membro. |
| 2 | Webscrapper | Quando o cadastro de um novo membro for realizado, então através de um webscrapper deve-se recuperar e armazenar da página do Github as informações:<ul><li>Nome de usuário do Github</li><li>Número de Followers</li><li>Número de Following</li><li>Número de Stars</li><li>Número de contribuições no último ano</li><li>URL da imagem de perfil</li><li>Email</li><li>Localização</li></ul> |
| 3 | Encurtamento de URLs | Ao cadastrar um perfil, a URL do Github deverá ser armazenada de forma encurtada, por exemplo, https://bitly.com/. |
| 4 | Atualizar perfil por re-scan | Após cadastrado, também deve ser possível escanear (de forma manual) o perfil do Github em busca de novas informações que possam ter sido adicionadas. |
| 5 | Interface do usuário | <ul><li>A página principal do sistema deverá exibir um campo de busca.</li><li>A busca poderá ser preenchida com qualquer informação do perfil (nome, usuário do Github, organização, localização, etc).</li><li>Os resultados deverão ser uma lista de usuários contendo nome, URL encurtada do perfil do Github e botões para editar/visualizar o registro.</li><li>A página de perfil deverá exibir todos os campos salvos.</li><li>Deve-se exibir a imagem de perfil do usuário utilizando a URL salva do Github.</li><li>Deve-se adicionar botões para re-escanear/editar/remover o registro. OBS: deve-se apenas editar o nome e URL, já que os outros dados serão extraídos com Webscrapper.</li></ul> |

## Instalação

Antes de começar, para executar os serviços, é recomendado que você tenha instalado:

* ruby - 2.5.7, bundle, rails e rake
* postgresql (sendo importante também instalar o pacote libpq-dev)
* nodejs e yarn (para gerenciar os pacotes necessários do front end - client)

### API

Instale as dependências do sistema com:

```bash
$ bundle install
```
```bash
$ rake db:create
```
```bash
$ rake db:migrate
```
Inicie o server:

```bash
$ rails server
```

### Client

Instale as dependências do sistema com:

```bash
$ yarn install
```

Inicie o server:

```bash
$ yarn dev
```

Após o ambiente ter iniciado, a API se encontra acessável em na porta [localhost:3000](http://localhost:3000) e o front-end na porta [localhost:8080](https://localhost:8080).

### Execução dos testes

Para executar os testes, é necessário executar a suíte de testes de cada tecnologia:

```bash
# api
$ bundle exec rails test

# ou para o front
$ yarn run test:unit
```