'use strict';

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch
const inquirer = require('inquirer');
const moment = require('moment');
let repo = null;


function requester(method, base, headers = {Accept: '*/*'}, body) {
    return (path = []) => fetch((base ? [base, ...path] : path).join('/'), {method, headers, body})
        .then(r => r.json());
}



const menu = async () => {
    if (!repo) repo = await inquirer.prompt({type:'input', name:'name', default:'mediastream', message:'Ingrese nombre repo:'})
    let op = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: `Seleccione una función para ${repo.name}`,
        choices: [
            'Mostrar información general',
            'Contar repositorios públicos',
            'Listar últimos posts de Typicode',
            'Crear post de prueba en Typicode',
        ]
    }]);

    let res;
    switch (op.choice) {

        case 'Contar repositorios públicos':
            process.stdout.write('\x1b[34mSolicitando..\x1b[m');
            res = await requester('GET')([`https://api.github.com/users/${repo.name}`]);
            process.stdout.write(`\r\x1b[32mTotal: \x1b[1m${res.public_repos}\x1b[m\x1b[32m repositorios públicos\x1b[m       \n\n`);
            menu();
            break;

        case 'Mostrar información general':
            process.stdout.write('\x1b[34mSolicitando..\x1b[m');
            res = await requester('GET')([`https://api.github.com/users/${repo.name}`]);
            process.stdout.write(`\r\x1b[32mNombre: \x1b[1m${res.name}\x1b[m\n`);
            process.stdout.write(`\r\x1b[32mTipo: \x1b[1m${res.type}\x1b[m\n`);
            process.stdout.write(`\r\x1b[32mFecha creación: \x1b[1m${moment(res.created_at).format('LL')}\x1b[m\n`);
            menu();
            break;

        case 'Listar últimos posts de Typicode':
            process.stdout.write('\x1b[34mSolicitando..\x1b[m');
            res = await requester('GET')([`https://jsonplaceholder.typicode.com/posts`]);
            for (let i = 0; i<3 ;i++) {
                process.stdout.write(`\r\x1b[32mTitulo: \x1b[1m${res[i].title}\x1b[m\n`);
                process.stdout.write(`\r\x1b[32mContenido: \x1b[1m${res[i].body}\x1b[m\n\n`);
            }
            menu();
            break;

        case 'Crear post de prueba en Typicode':
            process.stdout.write('\x1b[34mPosteando..\x1b[m');
            res = await requester('POST', null, 'Accept: */*', {title: 'Test', userId:1, body:'This is a test'})(['https://jsonplaceholder.typicode.com/posts']);
            console.log(`\r\x1b[32mOK: \x1b[1m`,res,'\x1b[m\n');
            menu();
            break;

    }

};

menu();


