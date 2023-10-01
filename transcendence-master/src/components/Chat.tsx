// import  { Link } from 'react-router-dom';
// import React from 'react';
import GroupsComponent from './Groups.tsx';
// import logoImg from "../assets/panda.svg";
import  DMComponent from './People.tsx';
// import  DMConveComponent from './DMConvComp.tsx';
// import { useState, useEffect } from 'react';
import {  Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'
// import CreateRoom from './CreateRoom.tsx';
// import JoinRoom from './JoinRoom.tsx';


// interface ConvData {
//   id: number;
//   name: string;
//   image: string;
//   message1: string;
//   message2: string;
//   date: string;
//   group: string;
//   online: string;
//   msgSent: boolean;
// }

interface PropsType {
  userId: string;
}

const Chat = (props: PropsType) => {
  const userId = props.userId;

  return (
    <div
      className="chat lg:ml-[2px] lg:mr-[2px] lg:mb-[10px] lg:h-full lg:w-full lg:flex lg:100vh lg:gap-[0px] 
    ml-[2px] mr-[2px] mb-[10px] h-full w-full flex justify-around 100vh gap-[0px]"
    >
      <div
        className="lg:ml-[20px] lg:mr-[-10px] lg:my-[15px] lg:h-full lg:w-full lg:flex-wrap lg:gap-[0px] lg:items-start
      ml-[20px] mr-[-10px] my-[15px] h-full w-full flex-wrap gap-[0px] items-start"
      >
        < GroupsComponent userId={userId}/>
        < DMComponent userId={userId}/>
      </div>
      <Outlet/>
    </div>
  );
};

export default Chat;
