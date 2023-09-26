// import React from 'react';
import { Link } from 'react-router-dom';
import DMComp from './DM.tsx';

function GroupsComponent() {
    return (
        <div className="lg:w-[90%] lg:h-[32%] lg:rounded-[25px] lg:border-solid lg:flex-wrap lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        w-[90%] h-[32%] rounded-[25px] border-solid flex-wrap border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]"
        >
          <div className="group ml-[25px] text-black dark:text-white flex justify-between items-center mb-[15px]">
            <div style={{
              fontFamily: "poppins",
              fontSize: "25px",
              fontStyle: "normal",
              fontWeight: 900,
              letterSpacing: "1.5px",
            }}
          >
            Groups
            </div>
            {/* <button
            className="flex items-center justify-center bg-[#6F37CF] hover:bg-[#4e1ba7] text-white font-bold h-[25px] w-[25px] rounded-full m-[10px] mr-[15px]" style={{
              fontFamily: "Roboto",
              fontSize: "25px",
              }}>
              +
            </button> */}
            <Link to="createRoom" className="flex items-center justify-center bg-[#6F37CF] hover:bg-[#4e1ba7] text-white font-bold h-[25px] w-[25px] rounded-full m-[10px] mr-[15px]" style={{
              fontFamily: "Roboto",
              fontSize: "25px",
              }}>+</Link>
          </div>
          <div className="h-[80%] convs my-[10px] ml-[10px] overflow-y-scroll">
            <DMComp />
            <DMComp />
            <DMComp />
          </div>
          </div>
    )
}

export default GroupsComponent