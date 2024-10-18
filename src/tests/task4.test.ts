import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('Task 4', () => {

  // With jest-each you can create parametrized tests
  // This one test case is actually 3.
  each(
    ['coffee', 'tea', 'chai']
  ).it('respond to the POST /api/beverages/%s', async (drink) => {
    const response = await app!
      .inject()
      .post(`/api/beverages/${drink}`)
    const body = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual({ drink: drink })
  })
})

afterEach(() => {
  app?.close()
})