import React, {useState} from "react";
import TopAppBar from "./components/TopAppBar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import GroupChat from "./components/GroupChat";
import MediaPage from "./components/MediaPage";
import { createContext } from "react";

export const ThemeContext = React.createContext(null);
export default function App() {
  const [changedPath, setPath] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : "light");
  function themeChange(state){
    setTheme(state);
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="App" id={theme}>
      <HashRouter>
        <TopAppBar path={window.location.pathname} setTheme = {themeChange}/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage setPath={setPath}/>} />
          <Route path="/chat" element={<GroupChat />} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </HashRouter>
    </div>
    </ThemeContext.Provider>
  );
}
