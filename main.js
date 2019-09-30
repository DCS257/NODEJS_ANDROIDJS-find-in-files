const back = require('androidjs').back
const fs = require('fs')
const path = require('path')
const findInFiles = require('find-in-files')

back.on('getDir', function (filepath) {
    console.log('back on getDir')
	
    let arrayFiles = []
	
    try {
        arrayFiles = fs.readdirSync(path.join(filepath, 'Listas'))
        back.send('getDir-result', arrayFiles)
    } catch (err) {
        // An error occurred
        back.send('getDir-result', ['@@'])
        console.error(err)
    }
})

back.on('findContents', function (filepath, listaFicheros, texto) {
    console.log(`back on findContents ${filepath}, ${listaFicheros}, ${texto}`)
	
    let arraySearchJSON = []

    for (var i = 0; i < listaFicheros.length; i++) {

        findInFiles.find({ 'term': texto, 'flags': 'ig' }, path.join(filepath, 'Listas', listaFicheros[i]), '.', '.txt$').then((results) => {
            for (var result in results) {
                const res = results[result]

                let search = {}
                const splitResult = result.split('/')
                search.file = splitResult[splitResult.length - 2] + ' ' + splitResult[splitResult.length - 1]
                search.line = res.line[0]
					
                arraySearchJSON.push(search)
            }
            return (arraySearchJSON)
        }).then((arraySearchJSON) => {
            back.send('findContents-result', arraySearchJSON)
        })
    }
})
