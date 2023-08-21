import { useState } from "react";
import "./App.css";
import HorzNav from "./components/Navigation/HorzNav";
import VertNav from "./components/Navigation/VertNav";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Comp from "./components/Comp";
import FindGame from "./components/FindGame";
import Game from "./components/Game";
import  Chat from './components/Chat';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function toggleOpen() {
    setOpen(!open);
  }
  return (
    <BrowserRouter> 
      <div className={`${darkMode ? "dark" : ""}`}>
        <div className="bg-[#EEEEFF] dark:bg-[#1A1C26] w-screen h-screen overflow-hidden">
          <HorzNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} open={open} toggleOpen={toggleOpen} />
          <div className="flex mt-[80px] h-full">
            <VertNav open={open} />
            <div className={`${open ? "" : ""}bg-[#EEEEFF] dark:bg-[#1A1C26] w-full h-full flex z-0` }>
                <Routes>
                  <Route path="home" element={<Comp name="home"/>}/>
                  {/* <Route path="chat" element={<Comp name="chat"/>}/> */}
                  <Route path="play" element={<FindGame/>} />
                  <Route path="chat" element={<Chat/>} />
                  <Route path="stats" element={<Comp name="stats"/>}/>
                  <Route path="game" element={<Game/>} />
                </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;