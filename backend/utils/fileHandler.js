const fs = require('fs')

function readFile(path) {
  const data = fs.readFileSync(path)
  return JSON.parse(data)
}

function writeFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = { readFile, writeFile }
