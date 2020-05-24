const fs = require('fs')
function myRequire(path) {
  const str = fs.readFileSync(path).toString()
  let module = {}
  eval(str)
  return module.exports
}

module.exports = {
  myRequire
}
