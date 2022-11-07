const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;

var workFilePath = path.join(__dirname, 'project-dist')
var stylePath = path.join(__dirname, 'styles')
fsPromises.mkdir(workFilePath).then(function() {}).catch(function() {});
var mergeStylePath = path.join(workFilePath, 'style.css')

fs.writeFile(mergeStylePath, " ",  (err) => {})
fs.readdir(stylePath,{withFileTypes: true}, (err, files)=>{
    files.forEach(file => {
        if (file.isFile()){
            fs.stat(path.join(stylePath, file.name), (error, stats)=>{
                var split = file.name.split('.')
                if(split[1] == 'css'){
                    fs.readFile(path.join(stylePath, file.name), 'utf8', (err, styleData) => {
                        fs.writeFile(mergeStylePath, styleData,{flag:'a'} ,  (err) => {})
                    })
                }
            })
        }
    })
})

var assetsPath = path.join(__dirname, 'assets')
var copyAssetsPath = path.join(workFilePath, 'assets')
fsPromises.mkdir(copyAssetsPath).then(function() {}).catch(function() {});

fs.unlink(copyAssetsPath,(err)=>{});

fs.readdir(assetsPath,{withFileTypes: true}, (err, files)=>{
    files.forEach(file => {
        fsPromises.mkdir(path.join(copyAssetsPath, file.name)).then(function() {}).catch(function() {});
        fs.readdir(path.join(assetsPath, file.name),{withFileTypes: true}, (err, docs)=>{
            docs.forEach(doc => {
                fsPromises.copyFile(path.join(path.join(assetsPath, file.name), doc.name), path.join(path.join(copyAssetsPath, file.name), doc.name))
            })
        })
    })
})

const htmlPath = path.join(__dirname, 'template.html')
const copyHtmlPath = path.join(workFilePath, 'index.html')
const componentsPath = path.join(__dirname, 'components')
fsPromises.copyFile(htmlPath, copyHtmlPath)

fs.readFile(htmlPath, "utf8", (error, data)=>{
    fs.readdir(componentsPath,{withFileTypes: true}, (err, files)=>{
        files.forEach(file => {
            var split = file.name.split('.')
            fs.readFile(path.join(componentsPath, file.name), "utf8", (error, component)=>{
                data = data.replace(`{{${split[0]}}}`, component.toString());
                fs.createWriteStream(copyHtmlPath).write(data)
            })
        })
    })
})