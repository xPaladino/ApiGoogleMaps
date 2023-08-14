require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true, 
  },
};

async function conectar() {
  try {
    await sql.connect(config);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    // Teste de consulta simples
    const result = await sql.query('SELECT TOP 1 * FROM Pesagemfluxo');
    console.log('Consulta realizada com sucesso:', result.recordset);

    // Fechar a conexão após o teste de consulta
    sql.close();
  } catch (error) {
    console.error('Erro ao conectar ou realizar a consulta:', error);
    throw error;
  }
}

// Chama a função conectar() para iniciar a conexão
conectar().catch((error) => {
  console.error('Erro durante a execução:', error);
});
/*
const config = {
  user: 'lpava',
  password: 'P@l4dino',
  server: 'WIN-K8ER9CQ\\Corporate', // Coloque o endereço correto aqui
  database: 'CorporateGEXPO',
  options: {
    encrypt: true,
    trustServerCertificate: true, // Use true se o servidor SQL estiver configurado para usar SSL/TLS
  },
};

sql.connect(config)
  .then(pool => {
    // Conexão bem-sucedida
    console.log('Conectado ao SQL Server!');

    // Execute suas consultas ou operações aqui...

    sql.close();
  })
  .catch(err => {
    // Tratamento de erro
    console.error('Erro ao conectar-se ao SQL Server:', err);
  });*/