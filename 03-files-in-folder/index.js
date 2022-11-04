const fs = require('fs')
const path = require('path')

var filePath = path.join(__dirname, 'secret-folder')

fs.readdir(filePath,{withFileTypes: true}, (err, files)=>{
    files.forEach(file => {
        if (file.isFile()){
            fs.stat(path.join(filePath, file.name), (error, stats)=>{
                var split = file.name.split('.')
                console.log(`${split[0]} - ${split[1]} - ${stats.size}byte`)
            })
        }
    })
})