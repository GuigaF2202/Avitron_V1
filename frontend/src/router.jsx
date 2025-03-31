import { createBrowserRouter } from 'react-router-dom';
import App from './containers/App';
import HomePage from './components/HomePage';
import Auth from './components/Auth';
import Avatar from './components/Avatar';
import Chat from './components/Chat';
import Map from './components/Map';
import Marketplace from './components/Marketplace';
import Downloads from './components/Downloads';
import News from './components/News';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import EmailVerification from './components/EmailVerification';
import ResendVerification from './components/ResendVerification';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <HomePage /> 
      },
      { path: "auth", element: <Auth /> },
      { path: "avatar", element: <Avatar /> },
      { path: "chat", element: <Chat /> },
      { path: "map", element: <Map /> },
      { path: "verificar-email/:token", element: <EmailVerification /> },
      { path: "reenviar-verificacao", element: <ResendVerification /> },
      { path: "marketplace", element: <Marketplace /> },
      { path: "downloads", element: <Downloads /> },
      { path: "news", element: <News /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reset-password", element: <ResetPassword /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default router;