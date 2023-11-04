import { rest } from 'msw';
import { AccessToken } from '../api/getAccessToken';
import { Filters } from '../api/getFilters';
import { Conversation, Message } from '../api/getLatestConversation';

const botMessage: Message = {
  is_from_bot: true,
  text: 'LTV stands for Loan-to-Value ratio. It is a financial metric used to assess the risk of a loan by comparing the loan amount to the appraised value of the asset being financed. In the context of the given information, LTV is a covenant that requires the Issuer to maintain a certain ratio between the outstanding amount of the Bonds and the market value of the properties.',
  sources: [
    {
      isin: 'NO0010754484',
      shortname: 'TRD Campus AS 15/25 4,26%',
      link: 'https://feed.stamdata.com/documents/NO0010754484_LA_20151222.pdf',
      page: 9,
      certainty: 0.899,
      distance: 0.201
    },
    {
      isin: 'SE0007186085',
      shortname: 'Jefast Holding AB  15/19 FRN FLOOR C',
      link: 'https://feed.stamdata.com/documents/SE0007186085_LA.pdf',
      page: 24,
      certainty: 0.897,
      distance: 0.205
    },
    {
      isin: 'NO0012698390',
      shortname: 'AKA AS 22/27 FRN C',
      link: 'https://feed.stamdata.com/documents/NO0012698390_LA_01_20220916.pdf',
      page: 8,
      certainty: 0.896,
      distance: 0.208
    },
    {
      isin: 'NO0010908163',
      shortname: 'KMC Properties ASA 20/23 FRN FLOOR C',
      link: 'https://feed.stamdata.com/documents/NO0010908163_LA_20201210.pdf',
      page: 44,
      certainty: 0.895,
      distance: 0.21
    }
  ]
};

export const handlers = [
  rest.post('*/auth/token', (req, res, ctx) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (username !== 'user' || password !== 'pass') {
      return res(
        ctx.delay(1000),
        ctx.status(401),
        ctx.json({
          detail: 'Incorrect username or password'
        })
      );
    }

    const accessToken: AccessToken = {
      access_token: '123',
      token_type: 'bearer'
    };
    return res(ctx.delay(1000), ctx.status(200), ctx.json(accessToken));
  }),

  rest.get('*/conversation', async (req, res, ctx) => {
    const conversation: Conversation = {
      created_at: '2023-11-04T08:19:05.367569+00:00',
      messages: [
        {
          is_from_bot: false,
          text: 'What is LTV?',
          sources: null
        },
        botMessage
      ]
    };
    return res(ctx.delay(1000), ctx.status(200), ctx.json(conversation));
  }),

  rest.post('*/conversation', async (req, res, ctx) => {
    const conversation: Conversation = {
      created_at: '2023-11-04T08:19:05.367569+00:00',
      messages: []
    };
    return res(ctx.delay(1000), ctx.status(200), ctx.json(conversation));
  }),

  rest.get('*/chatbot/filter', async (req, res, ctx) => {
    const filters: Filters = {
      isin: ['NO0010754484', 'SE0007186085', 'NO0012698390', 'NO0010908163'],
      issuer_name: [
        'Host Property AB (publ)',
        'Ideco AS',
        'SSM Holding AB (publ)'
      ],
      filename: [
        'NO0010908163_LA_20201210.pdf',
        'SE0010413989_SB_20190417.pdf',
        'SE0010296632_SB_20200515.pdf'
      ],
      industry: [
        'Real Estate - Commercial',
        'Real Estate - Residential',
        'Real Estate - Public buildings'
      ],
      risk_type: ['Non-Financial Company - Senior Secured'],
      green: ['No', 'Yes']
    };
    return res(ctx.delay(1000), ctx.status(200), ctx.json(filters));
  }),

  rest.post('*/chatbot', async (req, res, ctx) => {
    if (req.headers.get('authorization') != 'Bearer 123') {
      return res(
        ctx.status(401),
        ctx.json({
          detail: 'Not authenticated'
        })
      );
    }

    return res(ctx.delay(1000), ctx.status(200), ctx.json(botMessage));
  })
];
