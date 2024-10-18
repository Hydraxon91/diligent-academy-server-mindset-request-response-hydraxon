import fastify from 'fastify';

export default function createApp(options = {}) {
  const app = fastify(options)

  app.get('/api/hello', (request, reply) => {
    reply.send({hello: "World!"})
  })

  app.get('/api/good-bye', (request, reply) => {
    reply.send({"message": "Good Bye Visitor!"})
  })

  type GetHelloRoute = {
    Querystring: {name: string}
  }

  app.get<GetHelloRoute>('/api/hello2', (request, reply) => {
    const name = request.query.name;
    reply.send({hello:`${name}`})
  })

  type BeverageKind = {
    kind?: string | null
  }

  type PostBeverageRoute = {
    Body: BeverageKind
    Params: {drink: 'coffee' | 'tea' | 'chai'}
    Query: {
      milk?: 'yes' | 'no',
      sugar?: 'yes' | 'no'
    }
    Headers: {
      'codecool-beverages-dietary'?: 'lactose-intolerance' | 'vegan';
    };
  }

  app.post<PostBeverageRoute>('/api/beverages/:drink', (request, reply) =>{
    const { kind } = request.body as PostBeverageRoute['Body'] || {};
    const { drink } = request.params as PostBeverageRoute['Params'];
    const { milk, sugar } = request.query as PostBeverageRoute['Query'];
    const dietaryHeader = request.headers['codecool-beverages-dietary'] as PostBeverageRoute['Headers']['codecool-beverages-dietary'] | undefined
    const ingredients = [];

    const validDrinks: string[]= ['coffee', 'tea', 'chai'];
    if (!validDrinks.includes(drink as PostBeverageRoute['Params']['drink'])) {
        return reply.status(400).send({ reason: 'bad drink' }); 
    }

    if (milk === 'yes') {
      switch (dietaryHeader) {
        case 'lactose-intolerance':
          ingredients.push('lf-milk');
          break;
        case 'vegan':
          ingredients.push('oat-milk');
          break;
        default:
          ingredients.push('milk');
          break;
      }
    }
    if (sugar === 'yes') {
      ingredients.push('sugar')    
    }

    const drinkName = kind ? `${kind} ${drink}` : drink;

    if (drink === 'coffee') {
      return reply.status(418).send({ drink: drinkName, with: ingredients });
    }

    reply.status(201).send({ drink: drinkName, with: ingredients });
  })

  return app;
}