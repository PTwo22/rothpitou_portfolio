import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
// import App from './App.jsx'
import ReactUI from './ReactUI';
import { initGame } from './initGame';

const ui = document.getElementById('ui');
const root = createRoot(ui);

root.render(
  <StrictMode>
    <ReactUI />
  </StrictMode>,
);

initGame();

// ! original way
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
