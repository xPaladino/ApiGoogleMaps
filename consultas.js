// consultas.js
/*
const conectar = require('./conexao.js');
const sql = require('mssql');

async function executarConsulta(latitude, longitude) {
  try {
    await conectar();

    const query = `select * from eis_v_google_geo where latitude = '${latitude}' and longitude = '${longitude}'`;
    console.log(query);
    const result = await sql.query(query);

    return result.recordset.map((row) => ({
      ...row,
      lat: latitude,
      lng: longitude
    }));
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  } finally {
    sql.close();
  }
}

module.exports = executarConsulta;
*/
const conectar = require('./conexao.js');
const sql = require('mssql');

async function executarConsulta() {
  try {
    await conectar();
   
    const query = `select * from eis_v_google_geo`;
    //console.log(query);
    const result = await sql.query(query);

    return result.recordset;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  } finally {
    sql.close();
  }
}

module.exports = executarConsulta;
