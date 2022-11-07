const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;

var filePath = path.join(__dirname, 'files')
var copyFilePath = path.join(__dirname, 'files-copy')

fsPromises.mkdir(copyFilePath).then(function() {}).catch(function() {});

copyDir()
function copyDir() {
    fs.readdir(copyFilePath, (err, files)=>{
        files.forEach(file => {
            fs.unlink(path.join(copyFilePath, file),(err)=>{});
        })
    })
    fs.readdir(filePath,{withFileTypes: true}, (err, files)=>{
        files.forEach(file => {
            fsPromises.copyFile(path.join(filePath, file.name), path.join(copyFilePath, file.name))
        })
    })
}
