const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Tarea por hacer.'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Actualiza el estado de una tarea.'
}

const estado = {
    alias: 'e',
    descr: 'c: completadas. p: pendientes.',
}

const argv = require('yargs')
    .command('listar', 'Muestra todas las tareas pendientes.', {
        estado
    })
    .command('crear', 'Crea una nueva tarea por hacer.', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de una tarea.', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea.', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}