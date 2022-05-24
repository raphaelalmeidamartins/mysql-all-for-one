const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const Importer = require('mysql-import');

describe('Desafios de manipulação de tabelas', () => {
  let importer;
  let sequelize;

  beforeAll(() => {
    importer = new Importer(
      { user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, host: process.env.HOSTNAME, port: process.env.PORT }
    );

    sequelize = new Sequelize('', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {host:process.env.HOSTNAME, dialect: 'mysql', port: process.env.PORT})
  });

  afterAll(() => {
    importer.disconnect();
    sequelize.close();
  });

  beforeEach(async () => {
    await importer.import('./northwind.sql');
    await sequelize.query('USE northwind;', { type: 'RAW' });
  });

  afterEach(async () => await sequelize.query('DROP DATABASE northwind;', { type: 'RAW' }));

  describe('Queries de inserção', () => {
    const countOrderDetailsQuery = `SELECT COUNT(*) AS details_count FROM northwind.order_details
      WHERE order_id = 69
            AND product_id = 80
            AND quantity = 15.0000
            AND unit_price = 15.0000
            AND discount = 0
            AND status_id = 2
            AND date_allocated IS NULL
            AND purchase_order_id IS NULL
            AND inventory_id = 129`;

    const lastOrderDetailsIdsQuery = (limit = 1) =>
      `SELECT id FROM northwind.order_details ORDER BY id DESC LIMIT ${limit};`;

    describe("20 - Adicione à tabela 'order_details' um registro com 'order_id': 69, 'product_id': 80, 'quantity': 15.0000, 'unit_price': 15.0000, 'discount': 0, 'status_id': 2, 'date_allocated': NULL, 'purchase_order_id': NULL e 'inventory_id': 129", () => {
      it('Verifica o desafio20', async () => {
        const challengeQuery = readFileSync('desafio20.sql', 'utf8').trim();
        const lastOrderDetailsId = (
          await sequelize.query(lastOrderDetailsIdsQuery(), { type: 'SELECT' })
        )[0].id;

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);

        await sequelize.query(challengeQuery, { type: 'INSERT' });

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 1 }]);

        expect(await sequelize.query(lastOrderDetailsIdsQuery(), { type: 'SELECT' }))
          .toEqual([{ id: lastOrderDetailsId + 1 }]);
      });
    });

    describe("21 - Adicione com um único 'INSERT', duas linhas à tabela 'order_details' com os mesmos dados do requisito 20", () => {
      it('Verifica o desafio21', async () => {
        const challengeQuery = readFileSync('desafio21.sql', 'utf8').trim();
        const lastOrderDetailsId = (
          await sequelize.query(lastOrderDetailsIdsQuery(), { type: 'SELECT' })
        )[0].id;

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);

        await sequelize.query(challengeQuery, { type: 'INSERT' });

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 2 }]);

        expect(await sequelize.query(lastOrderDetailsIdsQuery(2), { type: 'SELECT' }))
          .toEqual([{ id: lastOrderDetailsId + 2 }, { id: lastOrderDetailsId + 1 }]);
      });
    });
  });

  describe('Queries de atualização', () => {
    const countOrderDetailsByDiscountQuery = (discount) =>
      `SELECT COUNT(*) AS details_count FROM order_details WHERE discount = ${discount};`;

    describe("22 - Atualize os dados na coluna 'discount' da tabela 'order_details' para 15", () => {
      it('Verifica o desafio22', async () => {
        const challengeQuery = readFileSync('desafio22.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(15), { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(15), { type: 'SELECT' }))
          .toEqual([{ details_count: 58 }]);
      });
    });

    describe("23 - Atualize os dados da coluna 'discount' da tabela 'order_details' para 30, onde o valor na coluna 'unit_price' seja menor que 10.0000", () => {
      it('Verifica o desafio23', async () => {
        const challengeQuery = readFileSync('desafio23.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(30), { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(30), { type: 'SELECT' }))
          .toEqual([{ details_count: 17 }]);
      });
    });

    describe("24 - Atualize os dados da coluna 'discount' da tabela 'order_details' para 45, onde o valor na coluna 'unit_price' seja maior que 10.0000 e o id seja um número entre 30 e 40", () => {
      it('Verifica o desafio24', async () => {
        const challengeQuery = readFileSync('desafio24.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(45), { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsByDiscountQuery(45), { type: 'SELECT' }))
          .toEqual([{ details_count: 7 }]);
      });
    });
  });

  describe('Queries de deleção', () => {
    const countOrderDetailsQuery = 'SELECT COUNT(*) AS details_count FROM order_details;';

    describe("25 - Delete todos os dados na coluna 'unit_price' da tabela 'order_details' em que o valor seja menor que 10.0000", () => {
      it('Verifica o desafio25', async () => {
        const challengeQuery = readFileSync('desafio25.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 58 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 41 }]);
      });
    });

    describe("26 - Delete todos os dados na coluna 'unit_price' da tabela 'order_details' em que o valor seja maior que 10.0000", () => {
      it('Verifica o desafio26', async () => {
        const challengeQuery = readFileSync('desafio26.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 58 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 20 }]);
      });
    });

    describe("27 - Delete todos os dados da tabela 'order_details'", () => {
      it('Verifica o desafio27', async () => {
        const challengeQuery = readFileSync('desafio27.sql', 'utf8').trim();

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 58 }]);

        await sequelize.query(challengeQuery, { type: 'UPDATE' });

        expect(await sequelize.query(countOrderDetailsQuery, { type: 'SELECT' }))
          .toEqual([{ details_count: 0 }]);
      });
    });
  });
});
