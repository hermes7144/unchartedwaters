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
import QnA from './pages/QnA';
import ProtectedRoute from './pages/ProtectedRoute'
import Citys from './pages/Citys';
import NewItem from './pages/NewItem';
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
      path: '/citys',
      element: <Citys />
    }, {
      path: '/qna',
      element: <QnA />
    }, {
      path: '/items/new',
      element:
        <ProtectedRoute requireAdmin>
          <NewItem />
        </ProtectedRoute>
    }
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
