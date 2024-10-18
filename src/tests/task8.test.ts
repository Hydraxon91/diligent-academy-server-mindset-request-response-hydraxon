import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('Task 8', () => {

  each(
    [
      ['coffee', 418],
      ['tea', 201],
      ['chai', 201]
    ]
  ).it('should respond to %s with status code %s', async (drink, expectedStatus) => {
    const path = `/api/beverages/${drink}`;
    
    const response = await app!
      .inject()
      .post(path)

    expect(response.statusCode).toStrictEqual(expectedStatus);
  })
})

afterEach(() => {
  app?.close()
})