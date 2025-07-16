import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router';
import { auth } from '../configs/firebase';

export default function AdminLayout() {
  const [isLoadPage, setLoadPage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        navigate('/');
      }
      setLoadPage(false);
    });
  }, []);

  if (isLoadPage) {
    return <div>Loading.....</div>;
  }
  return (
    <>
      <header> -- Admin side -- </header>
      <Outlet />
    </>
  );
}
