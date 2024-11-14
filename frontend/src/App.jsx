import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import NavigationBar from './components/NavigationBar';
import useThemeStore from './store/themeStore';
import useSystemTheme from './utils/useSystemTheme';
import { lightThemeClass, darkThemeClass } from './styles/theme.css';
import './styles/global.css';

const App = () =>  {
  const queryClient = new QueryClient();

  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const systemTheme = useSystemTheme();

  useEffect(() => {
    if (setTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, setTheme]);

  // 테마 클래스 적용
  const appliedThemeClass = theme === 'light' ? lightThemeClass : darkThemeClass;

  // body에 테마 클래스 적용
  useEffect(() => {
    document.body.classList.add(appliedThemeClass);
    return () => {
      document.body.classList.remove(appliedThemeClass); // 이전 클래스 제거
    };
  }, [appliedThemeClass]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationBar />
        <section style={{marginTop: '2.5rem'}}>
          <AppRoutes />
        </section>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
