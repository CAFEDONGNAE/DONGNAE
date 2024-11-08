import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from './theme.css';

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const modalContainer = style({
  backgroundColor: themeVars.color.background.body,
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '500px',
  width: '100%',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
});

export const modalHeader = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '15px',
});

export const modalContent = style({
  marginBottom: '20px',
});

export const modalActions = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
});

export const modalItemLayout = style({
  cursor: 'pointer',
  padding: '8px',
  backgroundColor: '#cccccc'
});

export const modalItem = styleVariants({
  default: [modalItemLayout],
  defaultSelected: [modalItemLayout, {
    backgroundColor: themeVars.color.brand
  }],
  mini: [modalItemLayout, {
    padding: '2px',
    border: '1px solid #ccc',
  }]
});