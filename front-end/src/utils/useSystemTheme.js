import { useEffect, useState } from 'react';

const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(matchMedia.matches ? 'dark' : 'light');

    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, []);

  return systemTheme;
}

export default useSystemTheme;