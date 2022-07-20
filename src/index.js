#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const deck = require('./tasks/deck')
const mod = require('./tasks/module')
const ui = require('./tasks/frontend')
const full = require('./tasks/full')
const server = require('./tasks/server')
const jamstack = require('./tasks/jamstack')
const cli = meow(
  `
  Usage

    $ npm init @kev_nz my-app

    $ npx @kev_nz/create my-app

    $ npx @kev_nz/create my-module -m

  Options
    --deck, -d  Create a slidedeck
    --module, -m Setup an module
    --server, -s Setup a server only
    --web, -w Setup a front-end only
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
      deck: {
        type: 'boolean',
        alias: 'd',
        default: false,
      },
      jam: {
        type: 'boolean',
        alias: 'j',
        default: false,
      },
      module: {
        type: 'boolean',
        alias: 'm',
        default: false,
      },
      server: {
        type: 'boolean',
        alias: 's',
        default: false,
      },
      web: {
        type: 'boolean',
        alias: 'w',
        default: false,
      },
      ui: {
        type: 'boolean',
        alias: 'ui',
        default: false,
      },
    },
  }
)

const [name] = cli.input
const isDeck = cli.flags.deck
const isNpmModule = cli.flags.module
const isWeb = cli.flags.web
const isServer = cli.flags.server
const isUI = cli.flags.ui
const isJamStack = cli.flags.jam
console.log('flags', cli.flags)
if (!name) {
  cli.showHelp(0)
}

const root = path.resolve(name)
// const appName = path.basename(root)

const getTask = () => {
  if (isDeck) return deck
  if (isNpmModule) return mod
  if (isWeb) return ui
  if (isServer) return server
  if (isJamStack) return jamstack
  if (isUI) return ui
  console.warn('No stack given')
  return full
}

getTask()(name, root)
