import { createTheme, createThemeContract, globalStyle } from '@vanilla-extract/css';

// 테마 변수 계약 생성
export const themeVars = createThemeContract({
  color: {
    brand: null,
    text: {
      default: null,
      opposite: null,
      focus: null,
      disabled: null,
    },
    background: {
      header: null,
      body: null,
      card: null,
      cardOpposite: null,
      input: null,
      button: null,
      buttonDisabled: null,
    },
  },
});

// 라이트 테마 및 다크 테마 정의
export const lightThemeClass = createTheme(themeVars, {
  color: {
    brand: '#8fecff',
    text: {
      default: '#111111',
      opposite: '#ffffff',
      focus: '#003adb',
      disabled: '#aaaaaa',
    },
    background: {
      header: '#ffffff',
      body: '#ffffff',
      card: '#ffffff',
      cardOpposite: '#ffffff',
      input: '#eeeeee',
      button: '#222222',
      buttonDisabled: '#dddddd',
    },
  },
});

export const darkThemeClass = createTheme(themeVars, {
  color: {
    brand: '#8fecff',
    text: {
      default: '#ffffff',
      opposite: '#111111',
      focus: '#003adb',
      disabled: '#aaaaaa',
    },
    background: {
      header: '#111111',
      body: '#111111',
      card: '#444444',
      cardOpposite: '#eeeeee',
      input: '#777777',
      button: '#ffffff',
      buttonDisabled: '#444444',
    },
  },
});

// 기본 글로벌 스타일 설정
globalStyle('html, body', {
  margin: 0,
  padding: 8,
  height: '100%',
  fontFamily: 'Pretendard, sans-serif',
  backgroundColor: themeVars.color.background.body,
  color: themeVars.color.text.default,
  boxSizing: 'border-box',
});