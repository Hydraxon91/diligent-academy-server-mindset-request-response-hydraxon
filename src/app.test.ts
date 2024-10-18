import { FastifyInstance } from "fastify";
import createApp from "./app"

let app: FastifyInstance | undefined;

beforeEach(() => {
  app = createApp({logger: false});
})

it('respond to the GET /api/hello', async () => {
  const response = await app!
    .inject()
    .get('/api/hello')
  const body = JSON.parse(response.body)

  expect(response.statusCode).toStrictEqual(200);
  expect(body).toStrictEqual({hello: 'World!'})
})

afterEach(() => {
  app?.close()
})