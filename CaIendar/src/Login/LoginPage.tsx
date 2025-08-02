import axios from "axios";
import { serverDirection } from "../serverDir/ServerDir";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function redirectToCalendar() {
    axios
      .post(`${serverDirection}/loginUser`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data !== "User not found") {
          console.log(res.data);

          sessionStorage.setItem("idOfUser", res.data);

          window.location.pathname = "/calendarMain";
        }
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Login Page</h1>

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
        onClick={redirectToCalendar}
        className="mb-4 bg-black text-white w-28 h-10 rounded-xl"
      >
        Login
      </button>
      <button
        className="border-2 rounded-lg p-1"
        onClick={() => (window.location.pathname = "/register")}
      >
        Go to Register
      </button>
    </div>
  );
}
