#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const initit = require('initit')
const npm = require('npm-programmatic')
const ora = require('ora')
const dependencies = require('../dependencies/base')
const UIDependencies = require('../dependencies/ui')
const message = require('../message')
const scripts = require('../scripts')
const logger = require('../logger')

let spinner

const template = 'Kevnz/app-template/templates/ui'

module.exports = (name, root) =>
  message('@kev_nz')
    .then(() => message('create UI app'))
    .then(() => {
      spinner = ora('Starting').start()
    })
    .then(() => initit({ name, template }))
    .then(() => {
      spinner.text = 'building package.json'
    })
    .then(() => {
      console.info('built package.json')

      const packageJson = {
        name: name,
        version: '1.0.0',
        private: true,
        scripts: { ...scripts.dev, ...scripts.ui },
      }
      fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2) + os.EOL
      )
      spinner.text = 'installing production dependencies'
      return npm.install(
        dependencies.dependencies.concat(UIDependencies.dependencies),
        {
          cwd: root,
          save: true,
        }
      )
    })
    .then(() => {
      spinner.text = 'installing dev dependencies'
      return npm.install(
        dependencies.devDependencies.concat(UIDependencies.devDependencies),
        {
          cwd: root,
          saveDev: true,
        }
      )
    })
    .then(() => {
      spinner.stop()
    })
    .then(() => message('Web Front-End Created'))
    .then(() => {
      process.exit(0)
    })
    .catch(err => {
      logger.error('Failed to create app')
      logger.error(err)
      process.exit(1)
    })
