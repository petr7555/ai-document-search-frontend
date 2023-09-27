import { rest } from 'msw';

export const handlers = [
  rest.post('*/auth/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: '123',
        token_type: 'bearer'
      })
    );
  })
];
