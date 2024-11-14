import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

export const chatContainerLayout = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const chatContainer = styleVariants({
  others: [chatContainerLayout, {
    alignItems: 'flex-start'
  }],
  my: [chatContainerLayout, {
    alignItems: 'flex-end'
  }]
})

const chatItemLayout = style({
  display: 'flex',
  padding: '0.5rem 1rem',
  margin: '0.2rem 0',
  borderRadius: '1rem',
  maxWidth: '40%',
  wordBreak: 'break-word'
});

export const chatItem = styleVariants({
  others: [chatItemLayout, {
    backgroundColor: themeVars.color.background.card,
    color: themeVars.color.text.default,
  }],
  my: [chatItemLayout, {
    backgroundColor: themeVars.color.background.cardOpposite,
    color: themeVars.color.text.opposite,
  }]
});