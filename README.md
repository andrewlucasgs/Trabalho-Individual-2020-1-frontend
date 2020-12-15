# Trabalho Individual - GCES - 2020/1

A Gestão de Configuração de Software é parte fundamental no curso de GCES, e dominar os conhecimentos de configuração de ambiente, containerização, virtualização, integração e deploy contínuo tem se tornado cada vez mais necessário para ingressar no mercado de trabalho.

Para exercitar estes conhecimentos, você deverá aplicar os conceitos estudados ao longo da disciplina no produto de software contido neste repositório.

O sistema se trata de uma aplicação Web, cuja funcionalidade consiste na pesquisa e exibição de perfis de usuários do GitHub, que é composta de:

- Front End escrito em Javascript, utilizando os frameworks Vue.JS e Quasar;
- Back End escrito em Ruby on Rails, utilizado em modo API;
- Banco de Dados PostgreSQL;

Para executar a aplicação na sua máquina, basta seguir o passo-a-passo descrito no arquivo [Descrição e Instruções](Descricao-e-Instrucoes.md).

## Critérios de avaliação

### 1. Containerização

A aplicação deverá ter seu ambiente completamente containerizado. Desta forma, cada subsistema (Front End, Back End e Banco de Dados) deverá ser isolado em um container individual.

Deverá ser utilizado um orquestrador para gerenciar comunicação entre os containers, o uso de credenciais, networks, volumes, entre outras configurações necessárias para a correta execução da aplicação.

Para realizar esta parte do trabalho, recomenda-se a utilização das ferramentas:

- Docker versão 17.04.0+
- Docker Compose com sintaxe na versão 3.2+

### 2. Integração contínua

Você deverá criar um 'Fork' deste repositório, onde será desenvolvida sua solução. Nele, cada commit submetido deverá passar por um sistema de integração contínua, realizando os seguintes estágios:

- Build: Construção completa do ambiente;
- Testes: Os testes automatizados da aplicação devem ser executados;
- Coleta de métricas: Deverá ser realizada a integração com algum serviço externo de coleta de métricas de qualidade;

O sistema de integração contínua deve exibir as informações de cada pipeline, e impedir que trechos de código que não passem corretamente por todo o processo sejam adicionados à 'branch default' do repositório.

Para esta parte do trabalho, poderá ser utilizada qualquer tecnologia ou ferramenta que o aluno desejar, como GitlabCI, TravisCI, CircleCI, Jenkins, CodeClimate, entre outras.

### 3. Deploy contínuo (Extra)

Caso cumpra todos os requisitos descritos acima, será atribuída uma pontuação extra para o aluno que configure sua pipeline de modo a publicar a aplicação automaticamente, sempre que um novo trecho de código seja integrado à branch default.


# Solução

Para melhorar a organização da estrutura do projeto e as integrações com seviços externos, o projeto foi dividido em 2 repositórios, [Backend]() e [Frontend]()

## Conteinerização

### Backend

Para conteinerização do backend foi utilizado um dockerfile baseado no ruby:2.5.7. E para o ambiente de teste e desenvolvimento foi criado um docker-compose com o serviço da api usando o dockerfile criado anteriormente, e uma imagem do postgresql para o serviço de banco de dados.

### Frontend
Para o frontend foi criado um dockerfile baseado no node-alpine para optimização do build, aplicando a divisão do build em estágios, assim o mesmo docker pode ser usado para desenvolvimento e produção. Um docker-compose também foi criado para facilitar a execução do projeto.

## Integração contínua

### Backend
Para a integração contínua do backend foi utilizado o **github actions**. O pipeline tem 4 passos:
- Build: utilizando o proprio docker compose
- Preparação para os testes: cria o banco e faz as migrações
- Teste: executa os testes.
- Analise do código: Utilizando o **sonarcloud** para realizar a analise da qualidade do código
Esse pipeline é executado ao realizar um push em qualquer branch do projeto e quando um pr para a master é aberto.

### Frontend
Para a integração contínua do frontend foi utilizado o **github actions**. O pipeline os seguintes passos:
- Build: o projeto é buildados usando o yarn
- Lint: verifica da folha de estilo
- Unit test: executa os testes unitários
- Analise de qualidade: Utilizando o **sonarcloud** para realizar a analise da qualidade do código.

## Deploy contínuo
Sempre que uma alteração entra na branch master uma nova imagem do docker é criada e é feito o push para o **DockerHub**. Ambos dockerfiles foram criados pensando também para a produção. A imagem do frontend já realiza o build e usa o nginx para servir os arquivos estáticos.

Um **docker-compose** foi criado para o ambiente de produção, que utiliza o **watchtower** para atualizar o ambiente de produção quando uma nova versão está disponível no Dockerhub.
