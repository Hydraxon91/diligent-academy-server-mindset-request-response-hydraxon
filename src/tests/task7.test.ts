import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: true });
})

describe('Task 7', () => {

  describe('when a milk given', () => {
    each(
      [
        ['coffee', 'lactose-intolerance', 'lf-milk'],
        ['tea', 'lactose-intolerance', 'lf-milk'],
        ['chai', 'lactose-intolerance', 'lf-milk'],
        ['coffee', 'vegan', 'oat-milk'],
        ['tea', 'vegan', 'oat-milk'],
        ['chai', 'vegan', 'oat-milk'],
      ]
    ).it('should change milk in %s when %s given to %s', async (drink, dietary, expectedMilk) => {
      const querystring = new URLSearchParams({milk: 'yes'})
      const path = `/api/beverages/${drink}?${querystring}`;
      const headers = { 'CodeCool-Beverages-Dietary': dietary }
      const expected = { drink, with: [expectedMilk] };

      const response = await app!
        .inject()
        .headers(headers)
        .post(path)
      const responseBody = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(responseBody).toStrictEqual(expected)
    })
  })

  describe('when sugar only given', () => {

    each(
      [
        ['coffee', 'lactose-intolerance'],
        ['tea', 'lactose-intolerance'],
        ['chai', 'lactose-intolerance'],
        ['coffee', 'vegan'],
        ['tea', 'vegan'],
        ['chai', 'vegan'],
      ]
    ).it('should not touch sugar in %s when %s given.', async (drink, dietary) => {
      const querystring = new URLSearchParams({sugar: 'yes'}) 
      const path = `/api/beverages/${drink}?${querystring}`;
      const headers = { 'CodeCool-Beverages-Dietary': dietary }
      const expected = { drink, with: ['sugar'] };

      const response = await app!
        .inject()
        .headers(headers)
        .post(path)
      const responseBody = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(responseBody).toStrictEqual(expected)
    })
  })
})

afterEach(() => {
  app?.close()
})