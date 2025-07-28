import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import AdminLayout from './layouts/AdminLayout.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage';
import AuthContextProvider from './contexts/AuthContext.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/add',
        element: <AddProductPage/>
      },
      {
        path: 'products/edit/:id',
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {

  return (
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  )
}

export default App
