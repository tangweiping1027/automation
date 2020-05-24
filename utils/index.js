const Path = require('path')

const path =function (path) {
  return Path.resolve(__dirname, path)
}

module.exports = {
  path
}
