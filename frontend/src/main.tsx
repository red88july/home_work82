import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';

import { persistor, store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


// addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
      <App/>
    </BrowserRouter>
    </PersistGate>
  </Provider>
);
