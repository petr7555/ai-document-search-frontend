import { Options } from 'cypress-axe';

const a11yOptions: Options = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag2aaa',
      'wcag21a',
      'wcag21aa',
      'wcag22aa',
      'best-practice'
    ]
  }
};

export default a11yOptions;
