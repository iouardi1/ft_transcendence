import React from "react";
import { Link } from "react-router-dom";
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
  
  const GroupComp = () => {
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
      <Link 
      to="/chat/groupConv">
      <div className="icon w-full h-[40px] mb-[15px] flex-wrap">
        <div className="icon w-full h-[40px] mb-[15px] flex justify-between">
          <div className="w-[70%] h-full ">
            <img
              className="logoImg rounded-[50px] w-[40px] h-[40px]"
              src={defaultConvData.image}
              alt={"${defaultConvdata.name}"}
            />
  
            <div
              className="groupName mb-[40px] text-black dark:text-white w-full mt-[-40px] ml-[45px]"
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
            <div
              className="groupMsg text-black dark:text-white w-[105px] mt-[-40px] ml-[45px]"
              style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                letterSpacing: "0.65px",
              }}
            >
              {defaultConvData.message1}
            </div>
          </div>
          <div
            className="date w-[30%] ml-[10%]"
            style={{
              color: "#7C7C7C",
              fontFamily: "poppins",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
              letterSpacing: "0.13px",
            }}
          >
            {defaultConvData.date}
          </div>
        </div>
        <hr className=" w-[90%] h-[1px] my-[-9px] bg-[#2C2C2CBD] opacity-[15%] border-0  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
      </div>
      </Link>
    );
  };

export default GroupComp