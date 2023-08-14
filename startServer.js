const { exec } = require('child_process');

exec('node servidor.js', (error, stdout, stderr) => {
    if (error){
        console.error('Erro:', error);
        return;
    }
    console.log('Servidor iniciado com sucesso:', stdout);
});