import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    text: 'blue'
  },
});

globalStyle('#root', {
  height: '100%',
  width: '100%'
})

globalStyle('h1', {
  fontWeight: 700,
});

globalStyle('h2', {
  fontWeight: 700,
});

globalStyle('h3', {
  fontWeight: 700,
});

globalStyle('a', {
  color: 'inherit',
});

globalStyle('button', {
  cursor: 'pointer',
});