const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;

var filePath = path.join(__dirname, 'files')
var copyFilePath = path.join(__dirname, 'files-copy')

if (!fs.existsSync(copyFilePath)){
    fs.mkdirSync(copyFilePath)
}

copyDir()
function copyDir() {
    fs.readdir(copyFilePath, (err, files)=>{
        files.forEach(file => {
            fs.unlinkSync(path.join(copyFilePath, file));
        })
    })
    fs.readdir(filePath,{withFileTypes: true}, (err, files)=>{
        files.forEach(file => {
            fsPromises.copyFile(path.join(filePath, file.name), path.join(copyFilePath, file.name))
        })
    })
}
