import React from 'react';
import { createRoot } from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ChapterProvider } from 'contexts/chapter';
import { StoreProvider } from 'contexts/store';
import { AuthProvider } from 'contexts/auth';
import { UserProvider } from 'contexts/user';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChapterProvider>
        <StoreProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </StoreProvider>
      </ChapterProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
