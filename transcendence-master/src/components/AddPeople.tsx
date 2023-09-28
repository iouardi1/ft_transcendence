import React from 'react'
import { Link, Outlet } from 'react-router-dom';


import logoImg from "../assets/panda.svg";

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

const DmRoomButton = () => {
  const defaultConvData: ConvData = {
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
    <div className="icon w-[95%] h-full flex-wrap m-auto">
      
      <div className="icon w-full h-[40px] flex items-center">
        <div className="w-full h-full flex items-center">
          <img
            className="logoImg rounded-[40px] w-[40px] h-[40px]"
            src={defaultConvData.image}
            alt={"${defaultConvdata.name}"}
          />

          <div
            className="groupName text-black dark:text-white w-full ml-[20px]"
            style={{
              fontFamily: "poppins",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "0.75px",
            }}
          >
            {defaultConvData.name}
          </div>
        </div>
        <Link 
          to="/chat/dmConv"
          className="w-[30px] h-[30px] bg-[#6F37CF] rounded-[25%]"
          >
            <div className="w-full h-full text-white text-center mt-[5px]"
            style={{
              fontFamily: "poppins",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "0.13px",
              }}>

              DM
            </div>
        </Link>
      </div>
    </div>
  );
};

function ExistinUser() {
  return (
    <div className='w-[350px] max-h-[60px] m-auto my-[40px] p-auto border-3 rounded-[25px] border-solid bg-[#EEEEFF]
     dark:bg-[#1A1C26] shadow-xl dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]'>
      <DmRoomButton />
    </div>
  )

}

export default function AddPeople () {

    return (
        <div className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        ml-[-10px] mr-[15px] my-[15px] w-[55%] h-[88%] rounded-[25px] flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none  dark:border-[#272932] dark:bg-[#272932]">
              
        <div className='w-full h-full flex-wrap justify-center'>
        <div className="w-full h-[10%] m-[1px] flex items-center justify-center text-black dark:text-white text-center" style={{
                fontFamily: "poppins",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: 900,
                letterSpacing: "1.5px",
            }} >
              Add DM
        </div>
        <hr className=" w-[50%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]">
        </hr>
        <div className="h-[88%] convs  overflow-y-scroll">
          
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
          {< ExistinUser/>}
      
        </div>
        </div>
        
      </div>
        
    )
}