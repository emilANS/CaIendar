import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CalendarMain from "./Calendar/CalendarMain.tsx";
import LoginPage from "./Login/LoginPage.tsx";
import RegisterPage from "./Login/RegisterPage.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/calendarMain" element={<CalendarMain />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
