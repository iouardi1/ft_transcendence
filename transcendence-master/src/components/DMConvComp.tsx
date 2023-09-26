
import React from 'react';
import logoImg from "../assets/panda.svg";
import { BrowserRouter,Router , Route, Routes, Outlet} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import CreateRoom from './CreateRoom.tsx';
import JoinRoom from './JoinRoom.tsx';

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
      online: "Online - Last seen, 2.02pm",
      msgSent: true,
    };
  
    return (
      <div className="w-full h-full p-[20px] flex">
        <div className="w-[100%] flex flex-wrap">
          <img
            className="logoImg rounded-[50px] w-[40px] h-[40px]"
            src={defaultConvData.image}
            alt={"${defaultConvdata.name}"}
          />
          <div className="w-full h-[40px] mt-[-42px] ml-[55px] flex-wrap justify-around items-center">
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
              {defaultConvData.name}
            </div>
            <div
              className="w-full h-[50%] mt-[7px] text-black dark:text-white"
              style={{
                fontFamily: "poppins",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                letterSpacing: "1.5px",
              }}
            >
              {defaultConvData.online}
            </div>
            <hr className=" w-[90%] h-[1px] my-[15px] bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
          </div>
        </div>
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

const DMConveComponent = () => {
  // const { ConvData } = props;
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
        <div className="w-full h-[10%] border-solid"></div>
      </div>
    );
}
export default DMConveComponent;