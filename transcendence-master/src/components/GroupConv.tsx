
import React from 'react';
import logoImg from "../assets/panda.svg";
import { Link } from 'react-router-dom';
// import { BrowserRouter,Router , Route, Routes, Outlet} from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
// import CreateRoom from './CreateRoom.tsx';
// import JoinRoom from './JoinRoom.tsx';

interface ConvData {
    id: number;
    name: string;
    image: string;
    message1: string;
    message2: string;
    date: string;
    group: string;
    online: string;
    msgSent: boolean;
  }

const ContactBar = () => {
    const defaultConvData: ConvData = 
    {
      id: 1,
      name: "Mohamed",
      image: logoImg,
      message1: "Hello everyone!",
      message2: "Hello back!",
      date: "Today, 12:15pm",
      group: "Friends Forever",
      online: "",
      msgSent: true,
    };
  
    return (
        <div className='w-full h-full flex-wrap justify-center'>
      <div className="w-full h-full flex p-[auto] items-center justify-between">
          <img
            className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px]"
            src={defaultConvData.image}
            alt={"${defaultConvdata.name}"}
          />
          <div className="w-[70%] h-full ml-[20px] flex items-center">
            <div className=" text-black dark:text-white w-full h-[50%]"
              style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1.5px",
              }}
            >
              {defaultConvData.group}  
            </div>
            </div>
            <div className='w-[20%] h-full flex items-center justify-end'>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/invToRoom" 
                    className="flex items-center justify-center bg-[#6F37CF] hover:bg-[#4e1ba7] text-white font-bold h-[25px] w-[25px] rounded-full m-[10px] mr-[15px]" style={{
                    fontFamily: "Roboto",
                    fontSize: "25px",
                    }}>+</Link>
                </div>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/invToRoom" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"        stroke-width="1.5" stroke="currentColor" 
                        className="w-8 h-8 dark:text-white text-center">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>

                                
                
                    </Link>
                </div>
            </div>
            
        </div>
            <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
        </div>
    );
  };
  
  const Mssg = () => {
    const defaultConvData: ConvData = {
      id: 1,
      name: "Mohamed",
      image: logoImg,
      message1: "Hello everyone !",
      message2: "Hello back!",
      date: "Today, 12:15pm",
      group: "Friends Forever",
      online: "Online - Last seen, 2.02pm",
      msgSent: false,
    };
    if (defaultConvData.msgSent) {
      return (
        <div className="w-[70%] h-fit m-[15px]">
          <div className="w-full h-fit flex">
            <div className=" w-[15px] h-[15px] mt-[50px] bg-[#EEEEFF] rounded-full dark:bg-[#1A1C26]"></div>
            <div
              className="p-[10px] ml-[15px] mt-[10px] max-w-[100%] w-fit h-fit bg-[#EEEEFF] rounded-[25px] dark:bg-[#1A1C26] text-left text-black dark:text-white text-clip overflow-hidden"
              style={{
                fontFamily: "poppins",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                letterSpacing: "1px",
              }}
            >
              {defaultConvData.message1}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-[90%] h-fit m-[15px]">
          <div className="max-w-[90%] w-fit h-fit flex flex-row-reverse">
            <div className=" w-[15px] h-[15px] mt-[15px%] bg-[#6F37CF] rounded-full"></div>
            <div
              className="p-[10px] ml-[15px] mt-[10px] max-w-[100%] w-fit h-fit bg-[#6F37CF] rounded-[25px] text-left text-white text-clip overflow-hidden"
              style={{
                fontFamily: "poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1px",
              }}
            >
              {defaultConvData.message1}
            </div>
          </div>
        </div>
      );
    }
  };

const GroupConveComponent = () => {
  const defaultConvData: ConvData = 
    {
      id: 1,
      name: "Mohamed",
      image: logoImg,
      message1: "Hello everyone!",
      message2: "Hello back!",
      date: "Today, 12:15pm",
      group: "Friends Forever",
      online: "Online - Last seen, 2.02pm",
      msgSent: true,
    };
    return (
        <div
        className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex flex-wrap dark:border-[#272932] dark:bg-[#272932]"
      >
          <div className="w-full h-[10%] border-solid mb-[25px]">
            <ContactBar />
          </div>
          <div className="w-full h-[70%] mt-[25px] flex-wrap">
            <Mssg />
          </div>
          <div className="w-[90%] h-[50px] border-solid flex  m-auto items-center">
              <img
                className="logoImg rounded-[50px] w-[40px] h-[40px]"
                src={defaultConvData.image}
                alt={"${defaultConvdata.name}"}
              />
              <form className="w-full h-[40px] ml-[15px] flex justify-around">
                  <div className="w-full h-full bg-[#EEEEFF] dark:bg-[#1A1C26] dark:text-white rounded-[10px]">
                    <input 
                      type="text"
                      placeholder="Type your text.."
                      className="w-[95%] h-full bg-transparent flex items-center justify-center ml-[10px]" style={{
                        fontFamily: "poppins",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                    }}>
                    </input>
                    </div>
                    <button className="w-[10%] h-full m-auto flex justify-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" fill="#6F37CF" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="w-6 h-6 text-[#6F37CF]">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                </form>
          </div>
      </div>
    );
}
export default GroupConveComponent;