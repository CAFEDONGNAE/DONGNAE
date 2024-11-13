import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: null,
      userId: null,

      login: (userName, userId) => set({ isLoggedIn: true, userName, userId }),
      logout: () => set({ isLoggedIn: false, userName: null, userId: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, userName: state.userName, userId: state.userId }),
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ?  JSON.parse(value) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useAuthStore;