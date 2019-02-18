#!/usr/bin/env node
const exec = require('child_process').exec
const asciify = require('asciify')
const chalk = require('chalk')
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
const root = process.cwd()
console.log('root', root)

// const appName = path.basename(root)

const storybook = () =>
  new Promise((resolve, reject) => {
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
]

const baseDevDeps = ['eslint', '@kev_nz/eslint-config', 'jest']

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
  .then(() => message('ADD REACT'))
  .then(() => {
    spinner = ora('Starting').start()
  })
  .then(() => {
    spinner.text = 'installing production dependencies'
    return npm.install(prodDeps, {
      cwd: root,
      save: true,
    })
  })
  .then(() => {
    spinner.text = 'installing dev dependencies'
    return npm.install(devDeps, {
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
  .then(() => message('UI Added'))
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    log.error('failed to create app')
    log.error(err)
    process.exit(1)
  })
