// import React from 'react'
// import GroupsComponent from './Groups'
// import DMComp  from "./DM.tsx"
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

const JoinRoomButton = () => {
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
    <div className="icon w-full h-full flex-wrap justify-around m-auto">
      <div className="icon w-full h-[40px] flex justify-around items-center">
        <div className="w-full h-full flex justify-around items-center">
          <img
            className="logoImg rounded-[50px] w-[40px] h-[40px]"
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
            {defaultConvData.group}
          </div>
        </div>
        <button 
        type='button'
        className="date w-[40px] h-[30px] bg-[#6F37CF]  text-white rounded-[25%] ml-[-65px]"
        style={{
          fontFamily: "poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          letterSpacing: "0.13px",
          }}
        >
         Join
        </button>
      </div>
    </div>
  );
};

function ExistinRoom() {
  return (
    <div className='w-[350px] max-h-[50px] m-auto my-[40px] p-auto border-3 rounded-[25px] border-solid bg-[#EEEEFF]
     dark:bg-[#1A1C26] shadow-xl dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]'>
      <JoinRoomButton />
    </div>
  )

}


export default function JoinRoom() {
  
  return (
    <div className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:dark:border-[#272932] lg:dark:bg-[#272932]
        ml-[-10px] mr-[15px] my-[15px] w-[55%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF] flex flex-wrap dark:border-[#272932] dark:bg-[#272932]"
    > 
      <div className='w-full h-full flex-wrap justify-center'>
        <div className="w-full h-[10%] m-[1px] flex items-center justify-center text-black dark:text-white text-center" style={{
                fontFamily: "poppins",
                fontSize: "25px",
                fontStyle: "normal",
                fontWeight: 900,
                letterSpacing: "1.5px",
            }} >
              Join Rooms
        </div>
        <hr className=" w-[50%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]">
        </hr>
        <div className="h-[86%] convs my-[20px] overflow-y-scroll">
          
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
          {< ExistinRoom/>}
      
        </div>
        </div>
       
      </div>
  )
}
