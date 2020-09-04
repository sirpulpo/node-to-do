const fs = require('fs');
const { resolve } = require('path');
// const { resolve } = require('path');

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
    return new Promise((resolve, reject) => {
        cargarDB();

        let todo = {
            descripcion,
            completa: false
        }

        let index = listadoToDo.findIndex(tarea => {
            return tarea.descripcion === descripcion
        });

        if (index < 0) {
            listadoToDo.push(todo);
            saveDB();
            resolve(todo);
        } else {
            reject(`Ya existe la tarea: ${descripcion}`);
        }
    });
}

module.exports.update = (descripcion, completa) => {
    return new Promise((resolve, reject) => {
        cargarDB();

        let index = listadoToDo.findIndex(tarea => tarea.descripcion === descripcion);

        if (index >= 0) {
            listadoToDo[index].completa = completa;
            saveDB();
            // return true;
            resolve(`Se actualizó: ${descripcion} al estado: ${completa}`);
        } else {
            reject(`No se actualizó: ${descripcion}`);
        }
    });
}

module.exports.borrar = (descripcion) => {
    return new Promise((resolve, reject) => {
        cargarDB();

        let index = listadoToDo.findIndex(tarea => {
            return tarea.descripcion === descripcion
        });

        if (index >= 0) {
            listadoToDo.splice(index, 1);
            saveDB();
            // return true;
            resolve(`Se eliminó: ${descripcion}`);
        } else {
            // return false;
            reject(`No se eliminó: ${descripcion}`);
        }
    });
}