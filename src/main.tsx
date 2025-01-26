import { createRoot } from 'react-dom/client';
import '@/app/styles/index.css';
import App from './app/App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_KEY = process.env.GOOGLG_CLIENT_ID as string;

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_KEY}>
    <App />
  </GoogleOAuthProvider>
);
