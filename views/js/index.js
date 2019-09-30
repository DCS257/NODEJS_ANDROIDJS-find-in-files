/* eslint-disable no-undef */

const btnBuscar = document.getElementById('btnBuscar')
btnBuscar.addEventListener('click', btnBuscarClick, false)

const btnLimpiar = document.getElementById('btnLimpiar')
btnLimpiar.addEventListener('click', btnLimpiarClick, false)

const btnToggle = document.getElementById('btnToggle')
btnToggle.addEventListener('click', btnToggleClick, false)

const btnCollapse = document.getElementById('btnCollapse')
btnCollapse.addEventListener('click', btnCollapseClick, false)

const btnExpand = document.getElementById('btnExpand')
btnExpand.addEventListener('click', btnExpandClick, false)

let carpetasMarcadas = false

// **********************************************************************************
// FUNCIONES FRONT
// **********************************************************************************

front.on('getDir-result', function (arrayFiles) {
    if (arrayFiles[0] !== '@@') {
        for (var i = 0; i < arrayFiles.length; i++) {
            var checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className = 'chkLista'
            checkbox.name = 'chk' + i
            checkbox.value = arrayFiles[i]
            // checkbox.id = "id" ;

            var lbl = document.createElement('label')
            lbl.innerHTML = arrayFiles[i]

            divCheckbox.appendChild(checkbox)
            divCheckbox.appendChild(lbl)
            divCheckbox.appendChild(document.createElement('br'))
        }
    }
})

front.on('findContents-result', async function (arraySearchJSON) {
    console.log('findContents-result' + JSON.stringify(arraySearchJSON))

    $('#jstree_demo_div').jstree('destroy').empty()

    $('#jstree_demo_div').jstree({
        'core': {
            'data': await procesarSearchJSON(arraySearchJSON)
        }
    }).bind('ready.jstree', function (event, data) {
        $(this).jstree('open_all')
    })

})

// **********************************************************************************
// EVENTOS
// **********************************************************************************

window.onload = function () {

    // Ejemplo de agregacion de checkbox dinamico
    // var checkbox = document.createElement('input')
    // checkbox.type = 'checkbox'
    // checkbox.className = 'chkLista'
    // checkbox.name = 'chk1'
    // checkbox.value = 'raiz1'
    // // checkbox.id = "id" ;

    // var lbl = document.createElement('label')
    // lbl.innerHTML = 'raiz1'

    // divCheckbox.appendChild(checkbox)
    // divCheckbox.appendChild(lbl)
    // divCheckbox.appendChild(document.createElement('br'))
		
    front.send('getDir', app.getPath('userData'))
}

function btnBuscarClick () {
    console.log('btnBuscarClick')

    // let arraySearchJSON = []

    // let search1 = {}
    // search1.id = '1'
    // search1.parent = '#'
    // search1.text = 'uno.txt'
    // arraySearchJSON.push(search1)

    // let search2 = {}
    // search2.id = '2'
    // search2.parent = '#'
    // search2.text = 'dos.txt'
    // arraySearchJSON.push(search2)

    // let search3 = {}
    // search3.id = '3'
    // search3.parent = '1'
    // search3.text = 'texto en uno.txt'
    // arraySearchJSON.push(search3)

    // let search4 = {}
    // search4.id = '4'
    // search4.parent = '1'
    // search4.text = 'texto en uno segundo.txt'
    // arraySearchJSON.push(search4)

    // let search5 = {}
    // search5.id = '5'
    // search5.parent = '2'
    // search5.text = 'texto en dos dos.txt'
    // arraySearchJSON.push(search5)

    // $('#jstree_demo_div').jstree({
    //     'core': {
    //         'data': arraySearchJSON
    //     }
    // }).bind('ready.jstree', function (event, data) {
    //     $(this).jstree('open_all')
    // })

    // Ejemplo ...
    // $('#jstree_demo_div').jstree({
    //     'core': {
    //         'data': [
    //             { 'id': 'ajson1', 'parent': '#', 'text': 'Simple root node' },
    //             { 'id': 'ajson2', 'parent': '#', 'text': 'Root node 2' },
    //             { 'id': 'ajson3', 'parent': 'ajson2', 'text': 'Child 1' },
    //             { 'id': 'ajson4', 'parent': 'ajson2', 'text': 'Child 2' }
    //         ]
    //     }
    // })

    const texto = document.getElementById('txtTexto').value

    let listaSeleccionados = []
    let listaElements = document.getElementsByClassName('chkLista')
    for (var i = 0; i < listaElements.length; i++) {
        if (listaElements[i].checked) {
            listaSeleccionados.push(listaElements[i].value)
        }
    }

    console.log('btnBuscarClick ' + JSON.stringify(listaSeleccionados))
    front.send('findContents', app.getPath('userData'), listaSeleccionados, texto)
}

function btnToggleClick () {
    carpetasMarcadas = !carpetasMarcadas

    let checkboxes = document.getElementsByClassName('chkLista')
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = carpetasMarcadas
    }
}

function btnLimpiarClick () {
    document.getElementById('txtTexto').value = ''
    document.getElementById('txtTexto').focus()
    $('#jstree_demo_div').jstree('destroy').empty()
}

function btnCollapseClick () {
    $('#jstree_demo_div').jstree('close_all')
}

function btnExpandClick () {
    $('#jstree_demo_div').jstree('open_all')
}

// **********************************************************************************
// FUNCIONES PRIVADAS
// **********************************************************************************

function procesarSearchJSON (arraySearchJSON) {
    return new Promise(resolve => {

        /*
		const arraySearchJSON = [
			{ file: 'fichero1.txt',
				line: 'linea fichero1.txt'
			},
			{ file: 'fichero2.txt',
				line: 'linea fichero2.txt'
			},
			{ file: 'fichero1.txt',
				line: 'linea2 fichero1.txt'
			},
			{ file: 'fichero1.txt',
				line: 'linea3 fichero1.txt'
			},
			{ file: 'fichero3.txt',
				line: 'linea fichero3.txt'
			},
			{ file: 'fichero3.txt',
				line: 'linea2 fichero3.txt'
			}
		]
		*/

        // console.log('procesarSearchJSON ' + JSON.stringify(arraySearchJSON))

        let arrayFicheros = []
        let arrayTree = []

        arraySearchJSON.map(function (element) {
            if (arrayFicheros.indexOf(element.file) === -1) arrayFicheros.push(element.file)
        })

        // Array con los nodos padre que contienen los nombres de fichero
        for (var i = 0; i < arrayFicheros.length; i++) {
            let elementTree = {}
            elementTree.id = i + 1
            elementTree.parent = '#'
            elementTree.text = arrayFicheros[i]

            arrayTree.push(elementTree)
        }

        // Array con los nodos hijo que contienen el texto encontrado
        for (var i = 0; i < arraySearchJSON.length; i++) {
            let elementTree = {}
            elementTree.id = arrayFicheros.length + (i + 1)
            elementTree.parent = arrayFicheros.findIndex(element => element === arraySearchJSON[i].file) + 1
            elementTree.text = arraySearchJSON[i].line

            arrayTree.push(elementTree)
        }

        // console.log('>>>>>>>>>> ' + arrayFicheros)
        // console.log('>>>>>>>>>> ' + JSON.stringify(arrayTree))

        resolve(arrayTree)

    })

}
