import { FastifyInstance } from "fastify";
import createApp from "../app"
import each from "jest-each";

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({ logger: false });
})

describe('Task 9', () => {

  each(
    [
      ['coffee', 418],
      ['tea', 201],
      ['chai', 201]
    ]
  ).it('should respond properly if valid drink given', async (drink, expectedStatus) => {
    const path = `/api/beverages/${drink}`;
    const expected = { drink, with: [] };
    
    const response = await app!
      .inject()
      .post(path)
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(expectedStatus);
    expect(responseBody).toStrictEqual(expected)
  })

  it('should respond with 400 and an error body if non-valid drink given', async () => {
    const path = `/api/beverages/non-existent`;
    const expectedStatus = 400;
    const expectedBody = { reason: 'bad drink' };
    
    const response = await app!
      .inject()
      .post(path)
    const responseBody = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(expectedStatus);
    expect(responseBody).toStrictEqual(expectedBody)
  })
})




afterEach(() => {
  app?.close()
})