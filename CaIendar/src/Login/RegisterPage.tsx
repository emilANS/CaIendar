import { useState } from "react";

import { serverDirection } from "../serverDir/ServerDir";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function registerUser() {
    axios
      .post(`${serverDirection}/createUser`, {
        username: username,
        password: password,
      })
      .catch((err) => {
        console.error(err.data);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl">Register Page</h2>

      <input
        onChange={(event) => setUsername(event.target.value)}
        maxLength={10}
        className="text-center mt-5 border-2 rounded-lg"
        placeholder="Username"
      ></input>
      <input
        onChange={(event) => setPassword(event.target.value)}
        maxLength={10}
        className="text-center mt-5 mb-5 border-2 rounded-lg"
        placeholder="Password"
      ></input>

      <button
        onClick={registerUser}
        className="mb-4 bg-black text-white w-28 h-10 rounded-xl"
      >
        Register
      </button>
      <button
        className="border-2 rounded-lg p-1"
        onClick={() => (window.location.pathname = "/")}
      >
        Go to login
      </button>
    </div>
  );
}
