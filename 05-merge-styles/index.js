const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;

var filePath = path.join(__dirname, 'project-dist')
var mergeStylePath = path.join(filePath, 'bundle.css')
var stylePath = path.join(__dirname, 'styles')

fs.writeFile(mergeStylePath, " ",  (err) => {})
fs.readdir(stylePath,{withFileTypes: true}, (err, files)=>{
    files.forEach(file => {
        if (file.isFile()){
            fs.stat(path.join(stylePath, file.name), (error, stats)=>{
                var split = file.name.split('.')
                if(split[1] == 'css'){
                    fs.readFile(path.join(stylePath, file.name), 'utf8', (err, data) => {
                        fs.writeFile(mergeStylePath, data,{flag:'a'} ,  (err) => {})
                    })
                }
            })
        }
    })
})