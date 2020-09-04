const fs = require('fs');

let listadoToDo = [];

const saveDB = () => {
    let data = JSON.stringify(listadoToDo);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo grabar.');
        }
    })
}

const cargarDB = () => {
    try {
        listadoToDo = require('../db/data.json');
    } catch (error) {
        listadoToDo = [];
    }
}

module.exports.getListado = (estado) => {
    cargarDB();

    let nuevaLista = listadoToDo;

    if (estado === 'c') {
        nuevaLista = listadoToDo.filter(tarea => {
            return tarea.completa === true
        });
    } else if (estado === 'p') {
        nuevaLista = listadoToDo.filter(tarea => {
            return tarea.completa !== true
        });
    }

    return nuevaLista;
}

module.exports.crear = (descripcion) => {
    cargarDB();

    let todo = {
        descripcion,
        completa: false
    }

    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index < 0) {
        listadoToDo.push(todo);

        saveDB();

        return todo;
    } else {
        return `Ya existe la tarea: ${descripcion}`;
    }


}

module.exports.update = (descripcion, completa) => {
    cargarDB();

    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoToDo[index].completa = completa;
        saveDB();
        return true;
    } else return false;
}

module.exports.borrar = (descripcion) => {
    cargarDB();

    let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoToDo.splice(index, 1);
        saveDB();
        return true;
    } else {
        return false;
    }
}