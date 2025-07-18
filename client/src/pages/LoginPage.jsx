import { useState } from "react";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setFirebaseError("");

    let valid = true;

    if (!email) {
      setEmailError("Email tidak boleh kosong");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format email tidak valid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password tidak boleh kosong");
      valid = false;
    }

    if (!valid) return;

    try {
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userLoggedIn);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSwitch(e) {
    e.preventDefault();
    try {
      navigate("/auth/register");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? "border-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          {firebaseError && (
            <p className="text-red-600 text-sm text-center mb-3">
              {firebaseError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <span
            onClick={handleSwitch}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register di sini
          </span>
        </p>
      </div>
    </div>
  );
}
