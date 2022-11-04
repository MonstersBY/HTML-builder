const fs = require('fs')
const path = require('path')
const process = require('process')
const readline = require('readline')
const {stdin} = process;

var filePath = path.join(__dirname, 'text.txt')
var rr = fs.createWriteStream(filePath)

console.log('Write message:')

stdin.on('data', text => {
    if (text.toString().trim() == 'exit') {
        process.exit()
    } else {
        rr.write(text)
    }
});
process.on('SIGINT', () => {
    process.exit()
});
process.on('exit', () => {
    console.log('Goodbye');
});