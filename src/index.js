import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Invest from './pages/Invest';
import General from './pages/General';
import Info from './pages/Info';
import QnA from './pages/QnA';
import NewWriting from './pages/NewWriting';
import ProtectedRoute from './pages/ProtectedRoute'
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <NotFound />,
  children: [
    { index: true, path: '/', element: <Home /> },
    {
      path: '/invest',
      element: <Invest />
    },
    {
      path: '/general',
      element: <General />
    }, {
      path: '/info',
      element: <Info />
    }, {
      path: '/qna',
      element: <QnA />
    }, {
      path: '/writing/new',
      element:
        <ProtectedRoute requireAdmin>
          <NewWriting />
        </ProtectedRoute>
    },
  ]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
