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

export const PREVIEW_IMG =
  'https://www.pngkit.com/png/detail/1007-10071948_woman-avatar-female-profile-picture-placeholder.png';
