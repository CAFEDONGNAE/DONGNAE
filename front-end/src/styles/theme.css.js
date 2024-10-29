import { createTheme, createThemeContract, globalStyle } from '@vanilla-extract/css';

// 테마 변수 계약 생성
export const themeVars = createThemeContract({
  color: {
    background: null,
    text: null,
  },
});

// 라이트 테마 및 다크 테마 정의
export const lightThemeClass = createTheme(themeVars, {
  color: {
    background: '#ffffff',
    text: '#111111',
  },
});

export const darkThemeClass = createTheme(themeVars, {
  color: {
    background: '#111111',
    text: '#ffffff',
  },
});

// 글로벌 스타일 설정
globalStyle('html, body', {
  margin: 0,
  padding: 8,
  height: '100%',
  fontFamily: 'Pretendard, sans-serif',
  backgroundColor: themeVars.color.background,
  color: themeVars.color.text,
  boxSizing: 'border-box',
});