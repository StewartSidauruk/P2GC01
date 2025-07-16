import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>Ada konten</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
