import { create } from 'zustand';

// 상태 생성 함수
const useThemeStore = create((set) => ({
  theme: 'light', // 초기 상태: 라이트 모드
  setTheme: (theme) => set({ theme }), // setTheme 함수 정의
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
  })),
}));

export default useThemeStore;