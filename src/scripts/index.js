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
  test: 'jest --config=jest.config.js --detectOpenHandles --forceExit --watch',
  lint: 'eslint ./src',
  watch: 'npm-run-all --parallel dev:**',
}

const ui = {
  build: 'webpack --config ./src/webpack/prod.config.js --mode production',
  'dev:ui':
    'webpack-dev-server --config ./src/webpack/dev.config.js --mode development',
}

const deck = {
  start: 'mdx-deck deck.mdx -p 8088',
  build: 'mdx-deck build deck.mdx',
  pdf: 'mdx-deck pdf deck.mdx',
  image: 'mdx-deck screenshot deck.mdx',
  help: 'mdx-deck',
}
module.exports = {
  docker,
  server,
  ui,
  database,
  dev,
  deck,
}
