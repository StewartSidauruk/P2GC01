import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [agreeTnC, setAgreeTnC] = useState(false);
  const [tncError, setTncError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setFirebaseError("");
    setTncError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email tidak boleh kosong");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Format email tidak valid");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password tidak boleh kosong");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      isValid = false;
    }

    if (!agreeTnC) {
      setTncError("Anda harus menyetujui Syarat dan Ketentuan");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const userRegistered = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userRegistered);
      navigate("/");
    } catch (error) {
      console.log(error.code, "-", error.message);
      if (error.code === "auth/email-already-in-use") {
        setFirebaseError("Email sudah digunakan");
      } else {
        setFirebaseError("Gagal mendaftar, coba lagi");
      }
    }
  }

  async function handleSwitch(e) {
    e.preventDefault();
    try {
      navigate("/auth/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "-", errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Page</h1>
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={agreeTnC}
                onChange={(e) => setAgreeTnC(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">
                Saya menyetujui{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Syarat dan Ketentuan
                </a>
              </span>
            </label>
            {tncError && (
              <p className="text-red-500 text-xs mt-1">{tncError}</p>
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
            Register
          </button>
        </form>

        <p className="text-sm text-center">
          Sudah punya akun?{" "}
          <span
            onClick={handleSwitch}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login di sini
          </span>
        </p>
      </div>
    </div>
  );
}