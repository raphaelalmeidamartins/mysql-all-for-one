const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const Importer = require('mysql-import');

describe('Desafios iniciais', () => {
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

  describe("1 - Exiba apenas os nomes dos produtos da tabela 'products'", () => {
    it('Verifica o desafio1', async () => {
      const challengeQuery = readFileSync('desafio1.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult1');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("2 - Exiba os dados de todas as colunas da tabela 'products'", () => {
    it('Verifica o desafio2', async () => {
      const challengeQuery = readFileSync('desafio2.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult2');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("3 - Escreva uma query que exiba os valores da coluna que contém a primary key da tabela 'products'", () => {
    it('Verifica o desafio3', async () => {
      const challengeQuery = readFileSync('desafio3.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult3');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("4 - Conte quantos registros existem na coluna 'product_name' da tabela 'products'", () => {
    it('Verifica o desafio4', async () => {
      const challengeQuery = readFileSync('desafio4.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult4');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("5 - Monte uma query que exiba os dados da tabela 'products' a partir do quarto registro até o décimo terceiro", () => {
    it('Verifica o desafio5', async () => {
      const challengeQuery = readFileSync('desafio5.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult5');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("6 - Exiba os dados das colunas 'product_name' e 'id' da tabela 'products' de maneira que os resultados estejam em ordem alfabética dos nomes", () => {
    it('Verifica o desafio6', async () => {
      const challengeQuery = readFileSync('desafio6.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult6');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("7 - Mostre apenas os ids dos 5 últimos registros da tabela 'products' ordenados por 'id'", () => {
    it('Verifica o desafio7', async () => {
      const challengeQuery = readFileSync('desafio7.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult7');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe("8 - Faça uma consulta que retorne três colunas, respectivamente, com os nomes 'A', 'Trybe' e 'eh', e com valores referentes a soma de '5 + 6', a string 'de', a soma de '2 + 8'", () => {
    it('Verifica o desafio8', async () => {
      const challengeQuery = readFileSync('desafio8.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult8');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });
});
