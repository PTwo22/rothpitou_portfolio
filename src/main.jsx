import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
// import App from './App.jsx'
import ReactUI from './ReactUI';
import { initGame } from './initGame';
import { Provider } from 'jotai';
import { store } from './store';

const ui = document.getElementById('ui');
const root = createRoot(ui);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </StrictMode>,
);

initGame();

// ! original way
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
