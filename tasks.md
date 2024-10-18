# Tasks

## Task 1: Get to know your repo

Answer the following questions:

- A good start to understand the repo is to check the `package.json`. What is the HTTP server library used here? What development tools are configured? 
- What does the following scripts do? `dev`, `test`
- What is the entry point of the server?
- What do you think why is the `app.ts` and the `server.ts` are separated? 
- If you would create a new endpoint in which file would you put it?
- In the tests which method simulates the HTTP request?
- What do you think what does the `ts-node` package do?

## Task 2: Meet with Fastify

Fastify is an HTTP server just like Express JS, Nest JS or Hapi JS.

The goal of Fastify as its name suggests to be fast and modular.

It is pretty similar to Express, but uses a little bit different methods and properties on its Request and Reply (Response in Express) objects.


- Implement a new endpoint: `GET /api/good-bye`.
- It should respond with the following JSON string `{"message": "Good Bye Visitor!"}` and `200 OK` status.
- To run tests for this task: `npm test -- task2`

### Background materials

- [Fastify Home](https://fastify.dev/)
- [Fastify Docs](https://fastify.dev/docs/latest/)

## Task 3: Demo - Typing the routes

If we use Fastify with Typescript, we have to define the types of the given endpoint with the type parameter of the route shorthand methods (get, post, put etc...) to get proper types for e.g. the requests body when accessing it with the `request.body`.

In the route type you can define, the type of the request's 
body, query, route parameters, headers, and the reply's body. 

### TLDR; 

You have to define this type and pass it as type parameter to the given method:

```ts
type SomeRouteType = {
  Body?: RequestBodyType;
  Querystring?: RequestQuerystringType;
  Params?: RequestParamsType;
  Headers?: RequestHeadersType;  
  Reply?: ReplyBodyType
}
```

Example:

```ts
type PostPetsRoute = { 
  Body: {name: string, kind: "cat" | "dog" }
} 

app.post<PostPetsRoute>('/api/pets', (request, reply) => {
  const pet = request.pet; // pet is correctly typed right now
})

```

### Details

How can you figure something like this out?

You can follow these declarations by clicking on them in VSCode, but in the background material also linked the type definition files from GitHub.

As the current version (5.0.0) of Fastify it is defined on 
`RouteShorthandOptions` interface's `RouteGeneric` type param. 

The `RouteGeneric` interface extends two interfaces: `RequestGenericInterface` and `ReplyGenericInterface`. These two interfaces provide the given type shape.

### Background materials

- [Fastify Reference: Typescript](https://fastify.dev/docs/latest/Reference/TypeScript/)

Deep dive:

- https://github.com/fastify/fastify/blob/v5.0.0/types/route.d.ts
- https://github.com/fastify/fastify/blob/v5.0.0/types/request.d.ts
- https://github.com/fastify/fastify/blob/v5.0.0/types/reply.d.ts

## Task 4: Let's brew something hot ☕

- Create one endpoint which can handle both requests: `POST /api/beverages/coffee`, `POST /api/beverages/tea`, `POST /api/beverages/chai`.
- Use the path parameters to accomplish this task.
- The response's body should be JSON formatted: `{drink: <drink type>}`, based on the 3rd part of the path and a `200 OK` status code.
- Example: if `POST /api/beverages/coffee` invoked, the result is `{drink: 'coffee'}` 
- Do not forget to create a proper path type for the route parameters.
- To test this task issue: `npm test -- task4`

### Background materials

- [Fastify Reference: Request](https://fastify.dev/docs/latest/Reference/Request/)

## Task 5: Make it soft and sweet

- Extend the `POST /api/beverages/<drink>` (`<drink>` can be coffee, tea or chai) endpoint with a query string. `milk=<yes or no>&sugar=<yes or no>`. 
- The query params are optional. If some of them missing it is considered as "no".
- Extend the reply's body with a `with: []` prop. This array should contains the `'milk'` string if the milk query param was `yes` and similarly the `'sugar'` if the sugar param was `yes`.  
- Example: `POST /api/beverages/tea?sugar=yes` should respond with the following body in JSON format: `{drink: 'tea', with: ['sugar'] }`.
- To test this task issue: `npm test -- task5`

### Background materials

- [Fastify Reference: Request](https://fastify.dev/docs/latest/Reference/Request/)

## Task 6: Define the kind of the beverage

- Extend the `POST /api/beverages/<drink>` endpoint with a request body.
- The body contains the kind of a coffee or a tea. It is defined with an object, only one property: `kind` which is a custom string. `{kind: <kind of the main ingredient>}`.
- The kind should be added as a prefix for the drink.
- Example: `{kind: 'English Breakfast'}` request body in JSON format is sent to the `POST /api/beverages/tea` endpoint, the response should be `{drink: 'English Breakfast tea'}`. 
- To test this task issue: `npm test -- task6`

## Task 7: Take care of the dietary

- Extend the `POST /api/beverages/<drink>` endpoint with a custom `CodeCool-Beverages-Dietary` header.
- If the header's value is `lactose-intolerance` and a `milk` was given in the query string, it should be replaced with `lf-milk` in the response.
- If the header's value is `vegan` and a `milk` was given in the query string replace the milk with `oat-milk`.
- To test this task issue: `npm test -- task7`

- Hint: Header names are case insensitive, Fastify converts it to lowercase: `codecool-beverages-dietary`
- Hint: When given a header to the Rest Client no quotations marks are needed neither the header name nor the value.
`CodeCool-Beverages-Dietary: vegan`

## Task 8: Responding with proper status code

- The `POST /api/beverages/<drink>` should be respond from now with a `201 Created` status code instead of the `200 OK`.
- If the drink is not a tea or chai respond with a `418 I'm a teapot` 🫖 status code.
- To test this task issue: `npm test -- task8`

### Background materials

Fun:

- [RFC 2324: Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0)](https://datatracker.ietf.org/doc/html/rfc2324)

## Task 9: Never trust your guests

The server should always validate the user input, because it can be mistakenly wrong or intentionally evil (e.g. hacking your site).

- Respond with a `400 Bad Request` status code and a `{reason: 'bad drink'}` body, if the drink path param is something else than `'tea'`, `'chai'` or `'coffee'`. 
- To test this task issue: `npm test -- task9`


## Task 10: Demo - Built in validation

Fastify can provide a handy option to automatically check different HTTP building blocks.

The shape of the given request part (e.g.) can be described with a JSON Schema.

E.g. we can validate our beverages's path parameters with the following object:

```js
const paramsSchema = {
  type: "object",
  properties: {
    drink: { enum: ["tea", "coffee", "chai" ]}
  },
  required: ["drink"],
  additionalProperties: false
}
```

- It tells that the given data should be an object. `type: "object"`
- It should have a `drink` property. `properties: { drink: {...} }`.
- The drink property is an "enum", it has just the given values only: `drink: { enum: ["tea", "coffee", "chai" ]}`. If we want to allow any string, it should be drink: `{ type: 'string'}`.
- The object's `drink` property is obligatory (because by default all properties of an object in a JSON schema is optional). `required: ["drink"]`.
- And finally the object does not have any other properties listed in the properties: `additionalProperties: false`

It can be added to a route by providing the options param for the route handler:

```ts
const paramsSchema = {
  type: "object",
  properties: {
    drink: { enum: ["tea", "coffee", "chai" ]}
  },
  required: ["drink"],
  additionalProperties: false
}

app.post<PostBeveragesRoute>(
  '/api/beverages', 
  {
    schema: {
      params: paramsSchema
    }
  },
  (request, reply) => {
    const { drink } = request.params 
  }
)
```

- This code will automatically respond `400 Bad Request` status and built-in error object in the response body if
something else is parsed as the route params.
- It is in general a good practice to validate all user inputs at the entry point of the endpoint and later trust the given values and do not check everywhere.

### Background materials

- [Fastify Reference: Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
- [JSON Schema Docs: Objects](https://json-schema.org/understanding-json-schema/reference/object)
- [JSON Schema Docs: Enum](https://json-schema.org/understanding-json-schema/reference/enum)
- [JSON Schema](https://json-schema.org/)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)

## Task 11: Validate the body

- Use the Fastify's route validation to validate the body of the `POST /api/beverages/<drink>` endpoint.

## Task 12: Validate the query string too 

- Use the Fastify's route validation to validate the body of the `POST /api/beverages/<drink>` endpoint.

## Task 13: Serialization and deserialization

Deserialization is a process when the HTTP requests body is converted to the programming language's internal representation. (For example: JSON --> JS Object).

Fastify automatically *deserialize* the request body if the content type is either `application/json` or `text/plain`.

Serialization is a reverse process. The internal representation is converted to something that is transferred through the HTTP response body. (For example: JS Object --> JSON).

In Fastify it is possible to define a scheme for the response body. It has some benefits.

- Speeds up the HTTP server, because we tell exactly what we are looking for in the response, and do not need check everything in it with a recursive algorithm.
- It can filters out all non explicitly stated data from the response so it is harder to leak out something we don't want. 

Your task:

- Define the shape of the HTTP response's body using JSON Schema syntax in a case of `201 Created` status.
- The body should fulfill all implemented task's requirements.

### Background materials

- [Fastify Reference: Validation and Serialization](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)


## Task 14: Demo - The magic connection

Isn't tiring to write basically the same thing twice? The JSON Schema and the route's type. Basically we are defining the same thing in two different language (Typescript and JSON Schema).

Would be nice if the somehow Fastify can figure out the types
from the JSON Schema. 

It is actually possible with the type providers.

- Configure the JSON Schema to TS type provider for the server.
- Skip the type parameters from the route declaration.

Note: if something is wrong with the JSON Schema, you won't get any error messages, but the type of the given request part will be `unknown`. In this case You can check the JSON schema's validity with e.g. an online JSON Schema validator. 

### Background materials

- [Fasfity Reference: Type Providers](https://fastify.dev/docs/latest/Reference/Type-Providers/)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)
