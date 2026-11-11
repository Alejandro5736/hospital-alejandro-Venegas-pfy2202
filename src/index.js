import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {
  // Habilita el mocking solo si el entorno es de desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // Registra y activa el Service Worker para interceptar solicitudes HTTP
  return worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Asegura que el mocking esté listo antes de iniciar la app
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

reportWebVitals();