import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('Task 5', () => {

  describe('when milk search param is given', () => {

    each(
      ['coffee', 'tea', 'chai']
    ).it('should include milk to %s, if its value is yes', async (drink) => {
      const querystring = new URLSearchParams({ milk: 'yes' })
      const path = `/api/beverages/${drink}?${querystring}`
      const expectedBody = { drink: drink, with: ['milk'] }

      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(body).toStrictEqual(expectedBody);
    })

    each(
      ['coffee', 'tea', 'chai']
    ).it('should not include milk to %s, if its value is no', async (drink) => {
      const querystring = new URLSearchParams({ milk: 'no' })
      const path = `/api/beverages/${drink}?${querystring}`
      const expectedBody = { drink: drink, with: [] }

      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(body).toStrictEqual(expectedBody);
    })

  })

  describe('when sugar search param is given', () => {

    each(
      ['coffee', 'tea', 'chai']
    ).it('should include it to %s, if its value is yes', async (drink) => {
      const querystring = new URLSearchParams({ sugar: 'yes' })
      const path = `/api/beverages/${drink}?${querystring}`
      const expectedBody = { drink: drink, with: ['sugar'] }

      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(body).toStrictEqual(expectedBody);
    })

    each(
      ['coffee', 'tea', 'chai']
    ).it('should not include it to %s, if its value is no', async (drink) => {
      const querystring = new URLSearchParams({ sugar: 'no' })
      const path = `/api/beverages/${drink}?${querystring}`
      const expectedBody = { drink: drink, with: [] }

      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)

      expect(response.statusCode).toStrictEqual(200);
      expect(body).toStrictEqual(expectedBody);
    })

  })

  describe('when both milk and sugar given', () => {
    each(
      ['coffee', 'tea', 'chai']
    ).it('should include it to %s, if its value is yes', async (drink) => {
      const querystring = new URLSearchParams({ sugar: 'yes', milk: 'yes' })
      const path = `/api/beverages/${drink}?${querystring}`

      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)

      // used asymmetric matchers here to work with any order
      // of milk and sugar.
      expect(response.statusCode).toStrictEqual(200);
      expect(body).toEqual(
        // this is an asymmetric matcher: 
        // https://jestjs.io/docs/expect#expectobjectcontainingobject
        expect.objectContaining({ drink: drink })
      );
      expect(body.with).toEqual(
        // this is an asymmetric matcher too:
        // https://jestjs.io/docs/expect#expectarraycontainingarray
        expect.arrayContaining(['milk'])
      )
      expect(body.with).toEqual(
        expect.arrayContaining(['sugar'])
      )
      // we should check nothing else is in the array
      expect(body.with.length).toEqual(2);
    })


  })

  each(
    ['coffee', 'tea', 'chai']
  ).it('should not include anything to %s if both are no', async (drink) => {
    const querystring = new URLSearchParams({ sugar: 'no', milk: 'no' })
    const path = `/api/beverages/${drink}?${querystring}`
    const expectedBody = { drink: drink, with: [] }

    const response = await app!
      .inject()
      .post(path)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual(expectedBody);
  })

  describe('when non of them are given', () => {
    each(
      ['coffee', 'tea', 'chai']
    ).it('should not include anything to %s', async (drink) => {
      const path = `/api/beverages/${drink}`
      const expectedBody = { drink: drink, with: [] }
  
      const response = await app!
        .inject()
        .post(path)
      const body = JSON.parse(response.body)
  
      expect(response.statusCode).toStrictEqual(200);
      expect(body).toStrictEqual(expectedBody);
    })
  })

})



afterEach(() => {
  app?.close()
})