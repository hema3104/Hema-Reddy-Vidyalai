// Assuming you're in App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WindowWidthProvider } from './components/context/WindowWidthContext'; // Adjust the path if needed

ReactDOM.render(
  <WindowWidthProvider>
    <App />
  </WindowWidthProvider>,
  document.getElementById('root')
);
