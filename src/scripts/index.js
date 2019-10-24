/* eslint-disable spellcheck/spell-checker */

const docker = {
  'docker:up': 'docker-compose -f ./docker/dev/docker-compose.yml up',
  'docker:down': 'docker-compose -f ./docker/dev/docker-compose.yml down',
  'dev:db': 'npm run docker:up',
}

const server = {
  'dev:server': 'nodemon ./src/server/index.js',
}

const database = {
  'migrate:up': 'knex migrate:latest',
  'migrate:down': 'knex migrate:rollback',
  'migrate:create': 'typesetter migrate',
  model: 'typesetter model',
}

const dev = {
  test: 'isom test',
  lint: 'isom lint',
  watch: 'isom watch',
}

const ui = {
  build: 'isom build',
  dev: 'isom dev',
}

const deck = {
  start: 'mdx-deck deck.mdx -p 8088',
  build: 'mdx-deck build deck.mdx',
  pdf: 'mdx-deck pdf deck.mdx',
  image: 'mdx-deck screenshot deck.mdx',
  help: 'mdx-deck',
}

const serverless = {
  'dev:sls': 'export SLS_DEBUG=* && export IS_OFFLINE=true && sls offline start',
  'deploy:dev': 'export STAGE=dev && serverless deploy --stage dev',
  'deploy:test':
    'export STAGE=qa && export SLS_DEBUG=* && serverless deploy --stage qa',
  'deploy:prod': 'export STAGE=prod && serverless deploy --stage prod',,
}

module.exports = {
  docker,
  server,
  ui,
  database,
  dev,
  deck,
}
