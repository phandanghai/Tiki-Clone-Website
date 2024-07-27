import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/stores/stores';
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="993152484598-650tli4tbi8lgp6q783evdn1l11ttdcb.apps.googleusercontent.com">
      <App />
        </GoogleOAuthProvider>
    </PersistGate>
  </Provider>,
);
