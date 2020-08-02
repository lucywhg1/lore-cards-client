import chroma from 'chroma-js';

const colorNames: string[] = [
  'skyblue',
  'darkturquoise',
  'lightseagreen',
  'orange'
];

export const [primary, secondary, accent, warning] = chroma
  .scale(colorNames)
  .mode('lch')
  .colors(colorNames.length, null);
