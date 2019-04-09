const exec = require('child_process').exec
const storybook = (root, spinner) =>
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
module.exports = storybook
