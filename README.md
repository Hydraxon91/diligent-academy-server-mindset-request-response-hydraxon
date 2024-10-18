# HTTP requests and responses

## Setting up the repo

### Set up the REST Client

- Add the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VSCode extension to your VSCode.
- Issue an `Open user settings (JSON)` VSCode command, use `CTRL+SHIFT+P` and search for the command.
- Add the following line to the top level of the `settings.json`:  `"rest-client.previewOption": "exchange"`
- With this setting you will see both the request and the response in the REST Client.

### Install NPM dependencies

- Issue an `npm install` command.

### Test the server

- Issue an `npm run dev` command.
- Initiate a `GET http://localhost:4400/api/hello` (e.g. with the REST Client from the `requests.http`) file.

### Test the test framework

- Issue an `npm test -- app.test.ts` command.
- This run the tests from the `app.test.ts` file to check the test framework is set up properly.

## Using the repo

- Start a development server in watch mode: `npm run dev`.
- Run all tests: `npm test`.
- Run a specific test file `npm test -- <file name>`.
- Create a production build (TS -> JS): `npm run build`.
- Start the production build: `npm start`.

## Tasks

Check the [tasks.md](./tasks.md) for the details.

