import { signOut } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useNavigate } from 'react-router';
import './HomePage.css'; // Opsi untuk styling eksternal

export default function HomePage() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome Back!</h1>
      </header>

      <main className="home-content">
        <p>Selamat Datang</p>
      </main>

      <footer className="home-footer">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </footer>
    </div>
  );
}
