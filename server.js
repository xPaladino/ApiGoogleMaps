const express = require('express');
const app = express();
const executarConsulta = require('./consultas.js');
const path = require('path');

const publicPath = path.resolve(__dirname);

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

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
