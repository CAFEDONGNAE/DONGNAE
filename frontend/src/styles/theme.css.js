import { createTheme, createThemeContract, globalStyle } from '@vanilla-extract/css';

// 테마 변수 계약 생성
export const themeVars = createThemeContract({
  color: {
    focus: null,
    background: null,
    text: null,
    textOpposite: null,
    inputBackground: null,
    buttonBackground: null,
    buttonDisabled: null,
  },
});

// 라이트 테마 및 다크 테마 정의
export const lightThemeClass = createTheme(themeVars, {
  color: {
    focus: '#003adb',
    background: '#ffffff',
    text: '#111111',
    textOpposite: '#ffffff',
    inputBackground: '#dddddd',
    buttonBackground: '#222222',
    buttonDisabled: '#aaaaaa',
  },
});

export const darkThemeClass = createTheme(themeVars, {
  color: {
    focus: '#003adb',
    background: '#111111',
    text: '#ffffff',
    textOpposite: '#111111',
    inputBackground: '#999999',
    buttonBackground: '#ffffff',
    buttonDisabled: '#444444',
  },
});

// 기본 글로벌 스타일 설정
globalStyle('html, body', {
  margin: 0,
  padding: 8,
  height: '100%',
  fontFamily: 'Pretendard, sans-serif',
  backgroundColor: themeVars.color.background,
  color: themeVars.color.text,
  boxSizing: 'border-box',
});