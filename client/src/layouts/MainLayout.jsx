import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router';
import { auth } from '../configs/firebase';

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        navigate('/auth/login');
      }
    });
  }, []);

  return (
    <>
      <header> -- Home side --</header>
      <Outlet />
    </>
  );
}
