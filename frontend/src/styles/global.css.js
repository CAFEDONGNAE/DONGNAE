import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

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
  position: 'relative',
  textDecoration: 'none',
});

globalStyle('a::after', {
  content: '""',
  position: 'absolute',
  left: 0,
  bottom: -1,
  width: '100%',
  height: '2px', // 밑줄 두께
  backgroundColor: themeVars.color.focus
});

globalStyle('button', {
  cursor: 'pointer',
  backgroundColor: themeVars.color.buttonBackground,
  color: themeVars.color.textOpposite,
  borderWidth: 0,
  outline: 'none',
  padding: '12px 24px',
  borderRadius: '24px',
});

globalStyle('button:disabled', {
  backgroundColor: themeVars.color.buttonDisabled,
  cursor: 'not-allowed',
});

globalStyle('input', {
  backgroundColor: themeVars.color.inputBackground,
  borderWidth: 0,
  outline: 'none',
});