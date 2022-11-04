const fs = require('node:fs')
const path = require('node:path')
var filePath = path.join(__dirname, 'text.txt')
var rr = fs.createReadStream(filePath, 'utf8')

rr.on('readable', () => {
  console.log(rr.read())
});