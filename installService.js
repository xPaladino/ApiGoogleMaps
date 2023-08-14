const Service = require('node-windows').Service;
const path = require('path');

// cria obj

const svc = new Service({
    name: 'GeoLocalizacaoApi',
    description: 'Serviço Node.js para executar o servidor',
    script: path.join(__dirname, 'startServer.js')
});

// Eventos 

svc.on('install', () =>{
    console.log('Serviço instalado.');
    svc.start();
});

svc.on('alreadyinstalled',() =>{
	console.log('Serviço já instalado.');
});

svc.on('uninstall', ()=> {
    console.log('Serviço removido.');
});

svc.install();