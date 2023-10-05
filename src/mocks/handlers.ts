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
    if (req.headers.get('authorization') != 'Bearer 123') {
      return res(
        ctx.status(401),
        ctx.json({
          detail: 'Not authenticated'
        })
      );
    }
    if (question === 'Hello') {
      return res(
        ctx.status(200),
        ctx.json({
          answer: { text: 'Hi, how are you?' }
        })
      );
    }

    if (question === 'Hi, can you tell me about bonds?') {
      return res(
        ctx.status(200),
        ctx.json({
          answer: {
            text: 'Bonds are debt securities issued by governments, corporations, or other entities to raise capital. Investors who buy bonds effectively lend money to the issuer in exchange for periodic interest payments and the return of the bonds face value at maturity.',
            sources: [
              {
                link: 'https://www.nber.org/system/files/working_papers/w6801/w6801.pdf'
              }
            ]
          }
        })
      );
    }

    if (question === 'Hi, sup babygirl?') {
      return res(
        ctx.status(200),
        ctx.json({
          answer: {
            text: 'Babygirl is fine, thank you.',
            sources: [
              {
                link: 'https://www.youtube.com/watch?v=xvFZjo5PgG0'
              }
            ]
          }
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
