const asciify = require('asciify')
const message = text =>
  new Promise((resolve, reject) => {
    asciify(text, (err, res) => {
      if (err) {
        return reject(err)
      }
      console.info(res)
      return resolve()
    })
  })

module.exports = message
