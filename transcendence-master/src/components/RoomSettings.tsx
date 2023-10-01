
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

const GroupBar = () => {
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
        <div className="w-full h-full flex p-[auto] items-center justify-center">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[60px] h-[60px] flex justify-center items-center"
                src={defaultConvData.image}
                alt={"${defaultConvdata.name}"}
            />
            <div className="w-[70%] h-full ml-[20px] flex items-center justify-center">
                <div className=" text-black dark:text-white w-full h-[50%] text-center flex justify-center items-center"
                style={{
                    fontFamily: "poppins",
                    fontSize: "22px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    letterSpacing: "1.5px",
                    }}
                    >
                    {defaultConvData.group}  
                </div>
            </div>
            <div className='w-[20%] h-full flex items-center justify-end'>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/groupConv" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="w-8 h-8 dark:text-white text-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };
const ParticipantBar = () => {
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
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={defaultConvData.image}
                alt={"${defaultConvdata.name}"}
            />
            {/* <div className="w-[70%] h-full ml-[20px] flex items-center justify-start"> */}
                <div className=" text-black dark:text-white w-full h-[50%] items-center"
                style={{
                    fontFamily: "poppins",
                    fontSize: "17px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    letterSpacing: "1.5px",
                    }}
                    >
                    {defaultConvData.name}  
                {/* </div> */}
            </div>
            <div className='w-[20%] h-full flex items-center justify-end'>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/groupConv" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="w-8 h-8 dark:text-white text-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantsNumber = () => {
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
        <div className='w-full h-full flex justify-around items-center'>
            <div className='dark:text-white' 
                style={{
                    fontFamily: "poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    letterSpacing: "1.5px",
                    }}
                >
            Participants:

            </div>
            <div className='dark:text-white' 
                style={{
                    fontFamily: "poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    letterSpacing: "1.5px",
                    }}
                >
            85{/* //a modifier after fetching data */}

            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
);
};

const RoomSettings = () => {
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
        ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex-wrap dark:border-[#272932] dark:bg-[#272932]"
        >
            <div className='w-full h-full flex-wrap'>
                <div className="w-full h-[15%] border-solid mb-[25px]">
                    <GroupBar />
                </div>
                <div className="w-full h-[10%] mt-[25px] flex-wrap">
                    < ParticipantsNumber />
                </div>
                <div className="w-full h-[10%] mt-[25px] flex-wrap">
                    < ParticipantBar />
                </div>
            </div>
      </div>
    );
}
export default RoomSettings;