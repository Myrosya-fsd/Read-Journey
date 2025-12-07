import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./page/Home/Home.jsx";
import Library from "./components/Library/Library.jsx";

function App() {
  const location = useLocation();

  // Масив сторінок, на яких header НЕ потрібно показувати
  const noHeaderRoutes = ["/registration", "/login"];

  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
