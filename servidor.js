const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const executarConsulta = require('./consultas.js');
const path = require('path');

const publicPath = path.resolve(__dirname);

// Pasta onde estão os certificados
const certificadosPath = path.join(__dirname, 'certificados');

// Configurar as opções para o servidor HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.join(certificadosPath, 'privadakey29787.key')),
  cert: fs.readFileSync(path.join(certificadosPath, 'certificadopem29787.pem'))
};

// Servir os arquivos estáticos da pasta 'public'
app.use(express.static(publicPath));

app.get('/consultar', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const resultados = await executarConsulta();

    res.json(resultados);
  } catch (error) {
    console.error('Erro na rota /consultar:', error);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
  }
});

app.get('/mapa.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(publicPath, 'mapa.js'));
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Criar um servidor HTTPS
const httpsServer = https.createServer(httpsOptions, app);

// Iniciar o servidor na porta 3030
const PORT = 80;
httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS iniciado na porta ${PORT}`);
});
