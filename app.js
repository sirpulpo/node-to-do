const argv = require('./config/yargs').argv;
var colors = require('colors/safe');

const toDo = require('./to-do/to-do');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        toDo.crear(argv.descripcion)
            .then(tarea => {
                console.log(`Se creó la tarea:`,
                    colors.brightGreen.underline(` ${tarea.descripcion} `)
                );
            })
            .catch(err => console.log(colors.brightRed(err)));

        break;

    case 'listar':
        let listado = toDo.getListado(argv.estado);

        console.log(colors.yellow('\n======================'));

        if (argv.estado === 'c') {
            console.log(colors.brightYellow('| Tareas Completadas |'));
        } else if (argv.estado === 'p') {
            console.log(colors.brightYellow('| Tareas Pendientes  |'));
        } else {
            console.log(colors.brightYellow('| Tareas             |'));
        }

        console.log(colors.yellow('====================== \n'));

        for (let tarea of listado) {
            if (tarea.completa === true) {
                console.log(colors.brightGreen.underline(`* ${tarea.descripcion} `), ' ',
                    colors.bgCyan.brightWhite(` OK \n`)
                );
            } else {
                console.log(colors.brightGreen.underline(`* ${tarea.descripcion} `),
                    colors.brightRed(' TO DO \n')
                );
            }
        }
        break;

    case 'actualizar':
        toDo.update(argv.descripcion, argv.completado)
            .then(resp => console.log(colors.brightYellow(resp)))
            .catch(err => console.log(colors.brightRed(err)));

        break;

    case 'borrar':
        toDo.borrar(argv.descripcion)
            .then(resp => console.log(colors.brightYellow(resp)))
            .catch(err => console.log(colors.brightRed(err)));

        break;

    default:
        console.log('Comando no reconocido.');
        break;
}