import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';


const container = document.getElementById('root');

// Ensure the container is not null
if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element.');
}