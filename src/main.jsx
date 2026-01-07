import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
// import App from './App.jsx'
import ReactUI from './ReactUI';
import { initGame } from './initGame';
import { Provider, useAtomValue } from 'jotai';
import { gameStartedAtom, store } from './store';
import StartPage from './pages/StartPage';

// function App(){
//   const isStarted = useAtomValue(gameStartedAtom);
  
//   useEffect(() => {
//     if(isStarted){
//       initGame();
//     }
//   }, [isStarted]);

//   return isStarted ? <ReactUI /> : <StartPage />;
// }

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
