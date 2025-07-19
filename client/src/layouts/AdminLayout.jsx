import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminLayout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('pengecekan user di AdminLayout');
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <header> -- Admin side -- </header>
      <Outlet />
    </>
  );
}