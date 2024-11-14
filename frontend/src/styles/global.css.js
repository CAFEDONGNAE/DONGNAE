import { globalStyle } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

globalStyle('#root', {
  height: '100%',
  width: '100%',
})

globalStyle('h1', {
  fontWeight: 700,
});

globalStyle('h2', {
  fontWeight: 700,
});

globalStyle('h3', {
  fontWeight: 700,
  margin: 0,
});

globalStyle('h4', {
  fontWeight: 600,
  margin: 0,
});

globalStyle('mark', {
  fontWeight: 700,
  backgroundColor: '#ffc745'
})

globalStyle('a', {
  color: 'inherit',
  position: 'relative',
  textDecoration: 'none',
});

globalStyle('p', {
  margin: '0.4rem 0',
  fontSize: '1rem',
});

globalStyle('a::after', {
  content: '""',
  position: 'absolute',
  left: 0,
  bottom: -1,
  width: '100%',
  height: '2px', // 밑줄 두께
  backgroundColor: themeVars.color.text.default
});

globalStyle('button', {
  cursor: 'pointer',
  backgroundColor: themeVars.color.background.button,
  color: themeVars.color.text.opposite,
  borderWidth: 0,
  outline: 'none',
  padding: '1rem 2rem',
  borderRadius: '2rem',
  fontWeight: 500,
  fontSize: '1rem',
});

globalStyle('button:disabled', {
  backgroundColor: themeVars.color.background.buttonDisabled,
  color: themeVars.color.text.disabled,
  cursor: 'not-allowed',
});

globalStyle('input', {
  backgroundColor: themeVars.color.background.input,
  color: themeVars.color.text.default,
  borderWidth: 0,
  outline: 'none',
  width: '20rem',
  height: '2rem',
  borderRadius: '2rem',
  paddingLeft: '1rem',
  fontSize: '1rem'
});