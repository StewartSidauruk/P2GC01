import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const userRegistered = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userRegistered);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "-", errorMessage);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h1>Register Page</h1>
        <form
          onSubmit={handleRegister}
          action=""
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div>
            <label
              htmlFor=""
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor=""
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
