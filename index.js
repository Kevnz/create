#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const initit = require('initit')
const npm = require('npm-programmatic')
const logo = chalk.magenta('[Create an App]')
const log = (...args) => {
  console.log(logo, ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[ERROR]'), ...args)
}

const template = 'Kevnz/app-template/templates/full'

const cli = meow(
  `
  Usage

    $ npm init @kev_nz my-app

    $ npx @kev_nz/create my-app

`,
  {
    booleanDefault: undefined,
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      version: {
        type: 'boolean',
        alias: 'v',
      },
    },
  }
)

const [name] = cli.input

if (!name) {
  cli.showHelp(0)
}

const root = path.resolve(name)
const appName = path.basename(root)
console.log({
  name,
  root,
  appName,
})

const prodDeps = [
  'apollo-boost',
  'apollo-cache-inmemory',
  'apollo-client',
  'apollo-link-context',
  'apollo-link-http',
  'apollo-server-hapi',
  'hapi',
  'blipp',
  'vision',
  'inert',
  'good',
  'good-console',
  'hapi-cors-headers',
  'hapi-router',
  'graphql',
  'knex',
  'mini.css',
  'pg',
  'react@next',
  'react-apollo',
  'react-dom@next',
  '@reach/router',
  'styled-components',
  'the-platform',
  'xtconf',
]

const devDeps = [
  '@babel/core',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/preset-env',
  '@babel/preset-react',
  'babel-eslint',
  'babel-loader',
  'babel-jest',
  'babel-plugin-styled-components',
  'css-loader',
  'eslint',
  '@kev_nz/eslint-config',
  'html-webpack-plugin',
  'jest',
  'nodemon',
  'npm-run-all',
  'react-hot-loader',
  'react-testing-library',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
]
// todo: ensure directory doesn't exist

initit({ name, template })
  .then(() => {
    // now create the package and install deps

    const packageJson = {
      name: name,
      version: '1.0.0',
      private: true,
      scripts: {
        'docker:up': 'docker-compose -f ./docker/dev/docker-compose.yml up',
        'docker:down': 'docker-compose -f ./docker/dev/docker-compose.yml down',
        build:
          'webpack --config ./src/webpack/prod.config.js --mode production',
        'dev:db': 'npm run docker:up',
        'dev:server': 'nodemon ./src/server/index.js',
        'dev:ui':
          'webpack-dev-server --config ./src/webpack/dev.config.js --mode development',
        test:
          "jest --config=jest.config.js --detectOpenHandles --forceExit --testPathPattern='(src).*(__tests__).*.test.js'",
        lint: 'eslint ./src',
        watch: 'npm-run-all --parallel dev:**',
      },
    }
    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )

    return npm.install(prodDeps, {
      cwd: root,
      save: true,
    })
  })
  .then(() => {
    return npm.install(devDeps, {
      cwd: root,
      saveDev: true,
    })
  })
  .then(res => {
    log('created app')
    process.exit(0)
  })
  .then(res => {
    log('created app')
    process.exit(0)
  })
  .catch(err => {
    log.error('failed to create app')
    log.error(err)
    process.exit(1)
  })
