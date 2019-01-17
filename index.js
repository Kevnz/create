#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const exec = require('child_process').exec
const asciify = require('asciify')
const meow = require('meow')
const chalk = require('chalk')
const initit = require('initit')
const npm = require('npm-programmatic')
const logo = chalk.blue('[Create an App]')
const ora = require('ora')

let spinner
const log = (...args) => {
  console.log(logo, ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[ERROR]'), ...args)
}

const template = 'Kevnz/app-template/templates/full'
const baseTemplate = 'Kevnz/app-template/templates/base'
const cli = meow(
  `
  Usage

    $ npm init @kev_nz my-app

    $ npx @kev_nz/create my-app

    Options
    --base, -b  Only the server components
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
      base: {
        type: 'boolean',
        alias: 'b',
        default: false,
      },
    },
  }
)

const [name] = cli.input
const onlyBase = cli.flags.base

if (!name) {
  cli.showHelp(0)
}

const root = path.resolve(name)
// const appName = path.basename(root)

const storybook = () =>
  new Promise((resolve, reject) => {
    if (onlyBase) return resolve(true)
    spinner.text = 'installing storybook'
    exec(
      'npx -p @storybook/cli sb init',
      {
        cwd: root,
        maxBuffer: 200 * 1024,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      }
    )
  })
const baseProdDeps = [
  'apollo-server-hapi',
  'hapi',
  'blipp',
  'bookshelf',
  'vision',
  'inert',
  'good',
  'good-console',
  'hapi-cors-headers',
  'hapi-router',
  'graphql',
  'jsonwebtoken',
  'knex',
  'pg',
  'xtconf',
  'bcrypt',
]

const prodDeps = [
  'apollo-boost',
  'apollo-cache-inmemory',
  'apollo-client',
  'apollo-link-context',
  'apollo-link-http',
  'react',
  'react-apollo',
  'react-dom',
  'react-form-elements',
  '@reach/router',
  'styled-components',
  'the-platform',
].concat(baseProdDeps)

const baseDevDeps = [
  'eslint',
  '@kev_nz/eslint-config',
  'jest',
  'nodemon',
  'typesetter',
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
  'html-webpack-plugin',
  'npm-run-all',
  'react-hot-loader',
  'react-testing-library',
  'style-loader',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
].concat(baseDevDeps)

const message = text =>
  new Promise((resolve, reject) => {
    asciify(text, (err, res) => {
      if (err) {
        return reject(err)
      }
      console.log(res)
      return resolve()
    })
  })

message('@kev_nz')
  .then(() => message('create app'))
  .then(() => {
    spinner = ora('Starting').start()
  })
  .then(() => initit({ name, template: onlyBase ? baseTemplate : template }))
  .then(() => {
    spinner.text = 'building package.json'
  })
  .then(() => {
    console.info('built package.json')
    const baseScripts = {
      'docker:up': 'docker-compose -f ./docker/dev/docker-compose.yml up',
      'docker:down': 'docker-compose -f ./docker/dev/docker-compose.yml down',
      'dev:db': 'npm run docker:up',
      'dev:server': 'nodemon ./src/server/index.js',
      test:
        "jest --config=jest.config.js --detectOpenHandles --forceExit --testPathPattern='(src).*(__tests__).*.test.js'",
      lint: 'eslint ./src',
      watch: 'npm-run-all --parallel dev:**',
      'migrate:up': 'knex migrate:latest',
      'migrate:down': 'knex migrate:rollback',
      'migrate:create': 'typesetter migrate',
      model: 'typesetter model',
    }
    const fullScripts = {
      build: 'webpack --config ./src/webpack/prod.config.js --mode production',
      'dev:ui':
        'webpack-dev-server --config ./src/webpack/dev.config.js --mode development',
      model: 'typesetter model',
      ...baseScripts,
    }
    const packageJson = {
      name: name,
      version: '1.0.0',
      private: true,
      scripts: onlyBase ? baseScripts : fullScripts,
    }
    fs.writeFileSync(
      path.join(root, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    )
    spinner.text = 'installing production dependencies'
    return npm.install(onlyBase ? baseProdDeps : prodDeps, {
      cwd: root,
      save: true,
    })
  })
  .then(() => {
    spinner.text = 'installing dev dependencies'
    return npm.install(onlyBase ? baseDevDeps : devDeps, {
      cwd: root,
      saveDev: true,
    })
  })
  .then(storybook)
  .then(() => {
    // remove directory
  })
  .then(() => {
    spinner.stop()
  })
  .then(() => message('App created'))
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    log.error('failed to create app')
    log.error(err)
    process.exit(1)
  })
