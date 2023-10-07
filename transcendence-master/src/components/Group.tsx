import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/panda.svg";

interface ConvData {
    
    date: Date;
  }

  const GroupComp = (groupData) => {
    console.log("------------------>", groupData);
    const defaultConvData: ConvData = {

      date: (groupData.groupData.msgs.length) ? new Date(groupData.groupData.msgs[groupData.groupData.msgs.length - 1].sentAt) : null,
    };
    // console.log(defaultConvData.date.getMonth());
    // console.log(defaultConvData.date.getDay());
    // console.log(defaultConvData.date.getMonth());
    // console.log(defaultConvData.date.getMonth());

    const encodedData = encodeURIComponent(groupData.groupData.id);
    if (encodedData)
    {
    return (
      <Link 
      to= {`/chat/groupConv/?id=${encodedData}`}
        >
        <div className="icon w-full h-[40px] mb-[15px] flex-wrap">
        <div className="icon w-full h-[40px] mb-[15px] flex justify-between">
          <div className="w-[70%] h-full ">
            <img
              className="logoImg rounded-[50px] w-[40px] h-[40px]"
              src={(groupData.groupData.image) ? groupData.groupData.image : logoImg}
              alt={""}
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
              {groupData.groupData.RoomName}
            </div>
            <div
              className="groupMsg text-black dark:text-white w-[105px] mt-[-40px] ml-[45px] overflow-hidden whitespace-nowrap"
              style={{
                fontFamily: "poppins",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                letterSpacing: "0.65px",
              }}
            >
              {(groupData.groupData.msgs.length) ? groupData.groupData.msgs[groupData.groupData.msgs.length - 1].messageContent : ""}
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
            {
              // const date = defaultConvData.date.getUTCDate();
            
            }
          </div>
        </div>
        <hr className=" w-[90%] h-[1px] my-[-9px] bg-[#2C2C2CBD] opacity-[15%] border-0  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
      </div>
      </Link>
    );
          }
  };

export default GroupComp