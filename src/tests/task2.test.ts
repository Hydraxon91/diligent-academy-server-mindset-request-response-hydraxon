import { FastifyInstance } from "fastify";
import createApp from "../app"

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({logger: false});
})

describe('Task 2', () => {
  it('respond to the GET /api/good-bye', async () => {
    const response = await app!
      .inject()
      .get('/api/good-bye')
    const body = JSON.parse(response.body)
  
    expect(response.statusCode).toStrictEqual(200);
    expect(body).toStrictEqual({message: 'Good Bye Visitor!'})
  })
})


afterEach(() => {
  app?.close()
})