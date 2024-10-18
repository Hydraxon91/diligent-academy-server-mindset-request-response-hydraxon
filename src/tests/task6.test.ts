import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('Task 6', () => {

  each(
    [
      ['coffee', 'arabica'],
      ['tea', 'english breakfast'],
      ['chai', 'indian']
    ]
  ).it('should append the to %s the kind %s', async (drink, kind) => {
    const path = `/api/beverages/${drink}`;
    const requestBody = { kind: kind } 
    const expected = { drink: `${kind} ${drink}`, with: [] };
    
    const response = await app!
      .inject()
      .body(requestBody)
      .post(path)
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(200);
    expect(responseBody).toStrictEqual(expected)
  })
})

afterEach(() => {
  app?.close()
})