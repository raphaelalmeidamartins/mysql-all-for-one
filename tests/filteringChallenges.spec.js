const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const Importer = require('mysql-import');

describe('Desafios sobre filtragem de dados', () => {
  let sequelize;

  beforeAll(async () => {
    const importer = new Importer(
      { user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, host: process.env.HOSTNAME, port: process.env.PORT }
    );

    await importer.import('./northwind.sql');

    importer.disconnect();

    sequelize = new Sequelize('northwind', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {host:process.env.HOSTNAME, port: process.env.PORT, dialect: 'mysql'})
  });

  afterAll(async () => {
    await sequelize.query('DROP DATABASE northwind;', { type: 'RAW' });
    sequelize.close();
  });

  describe("9 - Mostre todos os valores da coluna 'notes' da tabela 'purchase_orders' que não são nulos", () => {
    it('Verifica o desafio9', async () => {
      const challengeQuery = readFileSync('desafio9.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult9');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("10 - Mostre todos os dados da tabela 'purchase_orders' em ordem decrescente ordenados por 'created_by' em que o 'created_by' é maior ou igual a 3", () => {
    it('Verifica o desafio10', async () => {
      const challengeQuery = readFileSync('desafio10.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult10');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe("11 - Exiba os dados da coluna 'notes' da tabela 'purchase_orders' em que seu valor de 'Purchase generated based on Order' é maior ou igual a 30 e menor ou igual a 39", () => {
    it('Verifica o desafio11', async () => {
      const challengeQuery = readFileSync('desafio11.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult11');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("12 - Mostre os resultados da coluna 'submitted_date' da tabela 'purchase_orders' em que a 'submitted_date' é do dia 26 de abril de 2006", () => {
    it('Verifica o desafio12', async () => {
      const challengeQuery = readFileSync('desafio12.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult12');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe("13 - Mostre o resultado da coluna 'supplier_id' da tabela 'purchase_orders' em que o 'supplier_id' seja 1 ou 3", () => {
    it('Verifica o desafio13', async () => {
      const challengeQuery = readFileSync('desafio13.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult13');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("14 - Mostre os resultados da coluna 'supplier_id' da tabela 'purchase_orders' em que o 'supplier_id' seja maior ou igual a 1 e menor ou igual 3", () => {
    it('Verifica o desafio14', async () => {
      const challengeQuery = readFileSync('desafio14.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult14');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("15 - Mostre somente as horas, sem os minutos e os segundos, da coluna 'submitted_date' de todos registros da tabela 'purchase_orders'", () => {
    it('Verifica o desafio15', async () => {
      const challengeQuery = readFileSync('desafio15.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult15');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("16 - Exiba os resultados da coluna 'submitted_date' da tabela 'purchase_orders' que estão entre '2006-01-26 00:00:00' e '2006-03-31 23:59:59'", () => {
    it('Verifica o desafio16', async () => {
      const challengeQuery = readFileSync('desafio16.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult16');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe("17 - Mostre os registros das colunas 'id' e 'supplier_id' da tabela 'purchase_orders' em que os 'supplier_id' sejam tanto 1, ou 3, ou 5, ou 7", () => {
    it('Verifica o desafio17', async () => {
      const challengeQuery = readFileSync('desafio17.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult17');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("18 - Mostre todos os registros da tabela 'purchase_orders' que tem o valor na coluna 'supplier_id' igual a 3 e o valor na coluna 'status_id' igual a 2", () => {
    it('Verifica o desafio18', async () => {
      const challengeQuery = readFileSync('desafio18.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult18');

      expect(
        JSON.stringify(await sequelize.query(challengeQuery, { type: 'SELECT' }))
      ).toEqual(JSON.stringify(expectedResult));
    });
  });

  describe("19 - Mostre a quantidade de pedidos que foram feitos na tabela 'orders' pelo 'employee_id' igual a 5 ou 6, e que foram enviados através do método coluna 'shipper_id' igual a 2", () => {
    it('Verifica o desafio19', async () => {
      const challengeQuery = readFileSync('desafio19.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult19');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });
});
