import { useState, useEffect } from "react";
import "./App.css";
import HorzNav from "./components/Navigation/HorzNav";
import VertNav from "./components/Navigation/VertNav";
import { BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
// import Comp from "./components/Comp";
import FindGame from "./components/FindGame";
import Game from "./components/Game";
import  Chat from './components/Chat';
import Login from "./components/Login";
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import DMConv from "./components/DMConv";
import DefaultChatComp from "./components/DefaultChatComp";
import AddPeople from "./components/AddPeople";
import GroupConv from "./components/GroupConv";
import InvToRoom from "./components/InvToRoom";
import RoomSettings from "./components/RoomSettings";
import BannedList from "./components/BannedList";
import { io } from 'socket.io-client';


export interface Token {
  sub: string;
  email: string;
}


function App() {
  const [socket, setSocket] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  
  function toggleOpen() {
    setOpen(!open);
  }
  
  const token = Cookies.get('accessToken');
  if (token) {
    const decode: Token = jwt(token);
    const userId: string = decode.sub;
    
    if (!socket)
    {
      const socketInstance = io('http://localhost:3003', {
        auth: {
          token: userId,
        }
      });
      setSocket(socketInstance);
    }
    
      
      const key = location.pathname;
    return (
      <BrowserRouter> 
        <div className={`${darkMode ? "dark" : ""}`}>
          <div className="bg-[#EEEEFF] dark:bg-[#1A1C26] w-screen h-screen overflow-hidden">
            <HorzNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} open={open} toggleOpen={toggleOpen} />
            <div className="flex mt-[80px] h-full">
              <VertNav open={open} />
              <div className={`${open ? " bg-[#EEEEFF] dark:bg-[#1A1C26] sm:w-custom-width h-full flex z-0 items" : ""} bg-[#EEEEFF] dark:bg-[#1A1C26] w-full h-full flex z-0`}
                >
                  <Routes location={location} key={key}>
                    {/* <Route path="home" element={<Comp name="home"/>}/> */}
                    {/* <Route path="chat" element={<Comp name="chat"/>}/> */}
                    <Route path="play" element={<FindGame />} />
                    <Route path="chat" element={<Chat userId={userId} socket={socket}/>} >
                      <Route index element={<DefaultChatComp/>}/>
                      <Route path="createRoom" element={<CreateRoom socket={socket} userId={userId} />}/>
                      <Route path="joinRoom" element={<JoinRoom userId={userId} socket={socket}/>}/>
                      <Route path="addPeople" element={<AddPeople socket={socket} userId={userId}/>}/>
                      <Route path="dmConv" element={<DMConv socket={socket} userId={userId}/>}/>
                      <Route path="groupConv" element={<GroupConv userId={userId} socket={socket}/>}/>
                      <Route path="invToRoom" element={<InvToRoom socket={socket} userId={userId}/>}/>
                      <Route path="roomSettings" element={<RoomSettings socket={socket} userId={userId}/>}/>
                      <Route path="bannedUsers" element={<BannedList socket={socket} userId={userId}/>}/>
                    </Route>
                    {/* <Route path="stats" element={<Comp name="stats"/>}/>  */}
                    <Route path="game" element={<Game/>}/>
                  </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
  return(
    <Login/>
  )
}

export default App;