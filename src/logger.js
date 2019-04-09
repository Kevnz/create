const chalk = require('chalk')
const logo = chalk.blue('[Create an App]')
const log = (...args) => {
  console.info(logo, ...args)
}
const error = (...args) => {
  console.error(chalk.red('[ERROR]'), ...args)
}

module.exports = {
  log,
  error,
}
