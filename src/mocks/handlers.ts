import { rest } from 'msw';

export const handlers = [
  rest.post('*/auth/token', (req, res, ctx) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (username !== 'user' || password !== 'pass') {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'Incorrect username or password'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        access_token: '123',
        token_type: 'bearer'
      })
    );
  }),

  rest.post('*/chatbot/', (req, res, ctx) => {
    const { question } = req.body as { question: string };

    if (question === 'Hello') {
      return res(
        ctx.status(200),
        ctx.json({
          answer: { text: 'Hi' }
        })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        error: 'Unknown error'
      })
    );
  })
];
