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

  rest.post('*/chatbot', async (req, res, ctx) => {
    const { question }: { question: string } = await req.json();

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
          text: 'Hi, how are you?',
          sources: []
        })
      );
    }

    if (question === 'Hi, can you tell me about bonds?') {
      return res(
        ctx.status(200),
        ctx.json({
          text: 'Bonds are debt securities issued by governments, corporations, or other entities to raise capital. Investors who buy bonds effectively lend money to the issuer in exchange for periodic interest payments and the return of the bonds face value at maturity.',
          sources: [
            {
              isin: 'NO1111111111',
              shortname: 'Who should buy long-term bonds? - Cambridge',
              link: 'https://www.nber.org/system/files/working_papers/w6801/w6801.pdf',
              page: 6
            }
          ]
        })
      );
    }

    if (question === 'Hi, what are some financial covenants?') {
      return res(
        ctx.status(200),
        ctx.json({
          text: 'There are several types of financial covenants, and the specific ones used can vary depending on the type of loan and the lender.',
          sources: [
            {
              isin: 'NO2222222222',
              shortname: 'What is a covenant? - Investopedia',
              link: 'https://www.investopedia.com/terms/c/covenant.asp',
              page: 1
            },
            {
              isin: 'NO3333333333',
              shortname: 'Covenants - FinancialEdge',
              link: 'https://www.fe.training/free-resources/financial-markets/covenants/',
              page: 1
            }
          ]
        })
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        error: 'Unknown error'
      })
    );
  }),
  rest.get('*/conversation', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        created_at: '2021-09-10T10:00:00Z',
        messages: [
          {
            is_from_bot: true,
            text: 'Hi, how are you?',
            sources: []
          }
        ]
      })
    );
  })
];
