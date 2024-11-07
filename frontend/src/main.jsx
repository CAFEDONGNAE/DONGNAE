import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import { worker } from './mocks/browser.js';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  console.log('개발환경입니다');
  // worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
