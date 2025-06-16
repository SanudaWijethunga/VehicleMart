import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "444683347946-q1om7lio31cm2sfnku7knkeno9q4db72.apps.googleusercontent.com"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId = {CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
