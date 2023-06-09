import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { AuthProvider } from 'contexts/auth';
import { ChapterProvider } from 'contexts/chapter';
import { LeaderboardProvider } from 'contexts/leaderboard';
import { StoreProvider } from 'contexts/store';
import { UserProvider } from 'contexts/user';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <StrictMode>
    <AuthProvider>
      <ChapterProvider>
        <StoreProvider>
          <UserProvider>
            <LeaderboardProvider>
              <App />
            </LeaderboardProvider>
          </UserProvider>
        </StoreProvider>
      </ChapterProvider>
    </AuthProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
