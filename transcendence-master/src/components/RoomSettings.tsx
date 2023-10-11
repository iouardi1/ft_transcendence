
import { useLocation } from "react-router-dom";
import logoImg from "../assets/panda.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const GroupBar = (props) => {
    return (
    <div className='w-full h-full flex-wrap justify-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-center">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[60px] h-[60px] flex justify-center items-center"
                src={props.roomState.room.image ? `data:image/jpeg;base64,${props.roomState.room.image}` : logoImg}
                alt={""}
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
                    {props.roomState.room.RoomName} 
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



const ParticipantOwner = (props) => {
    console.log("participants:    ", props);
    const role = props.roomState.rooms[0].role;

    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
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
                {props.roomState.username} 
            </div>
            <div className='w-[30%] h-full flex items-center justify-end'>
                <div 
                    className={`w-[100px] h-[40px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                        role === 'OWNER' ? 'opacity-[100%]' : role === 'ADMIN' ? 'opacity-[60%]' : 'opacity-[30%]'} `}
                    style={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                    }}
                >
                    {role}
                </div>
                <div className='w-[20px] h-full flex flex-row justify-end items-center ml-[10px]'>
                    <button
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className= {`
                                ${props.userId !== props.roomState.userId ? 'w-8 h-8 dark:text-white text-center' : ''}
                                `}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button> 
                </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantAdmin = (props) => {
    console.log("participants:    ", props);
    const role = props.roomState.rooms[0].role;
    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
            <div className=" text-black dark:text-white w-full h-[50%] items-center "
            style={{
                fontFamily: "poppins",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                letterSpacing: "1.5px",
                }}
                >
                {props.roomState.username} 
            </div>
            <div className='w-[30%] h-full flex items-center justify-end'>
                <div 
                    className={`w-[100px] h-[40px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                        role === 'OWNER' ? 'opacity-[100%]' : role === 'ADMIN' ? 'opacity-[60%]' : 'opacity-[30%]'} `}
                    style={{
                        fontFamily: "poppins",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        letterSpacing: "1.5px",
                    }}
                >
                    {role}
                </div>
                <div className='w-[10px] h-full flex flex-row justify-end items-center ml-[10px]'>
                    <button
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className= {`
                                ${props.userId !== props.roomState.userId ? 'w-8 h-8 dark:text-white text-center' : ''}
                                `}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button> 
                </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantAdmin1 = (props) => {
    console.log("participants:    ", props);
    const role = props.roomState.rooms[0].role;
    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
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
                {props.roomState.username} 
            </div>
            <div className='w-[30%] h-full flex items-center justify-around'>
            <div 
                className={` w-[100px] h-[40px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                    role === 'OWNER' ? 'opacity-[100%]' : role === 'ADMIN' ? 'opacity-[70%]' : 'opacity-[30%]'}`}
                style={{
                    fontFamily: "poppins",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                }}
            >
                {props.roomState.rooms[0].role}
            </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantUser = (props) => {
    // console.log("participants:    ", props);
    const role = props.roomState.rooms[0].role;
    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
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
                {props.roomState.username} 
            </div>
            <div className='w-[20%] h-full flex items-center justify-around'>
            <div 
                className={`w-[100px] h-[40px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                    role === 'OWNER' ? 'opacity-[100%]' : role === 'ADMIN' ? 'opacity-[60%]' : 'opacity-[30%]'}`}
                style={{
                    fontFamily: "poppins",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                }}
            >
                {props.roomState.rooms[0].role}
            </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantsNumber = (props) => {

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
            {props.roomState.participants.length}

            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
);
};

const RoomSettings = (props) => {
    const userId = props.userId;
  
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const receivedData = params.get('id');

    const [roomState, setRoomState] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/chat/roomSettings/${receivedData}`, {
            params: {
              userId: userId,
            }
          });
          if (response.status === 200) {
            setRoomState(response.data);
        }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
        useEffect(() => {
          fetchData();
        }, []);
    if (roomState)
    {
        console.log("roomState in parent: ", roomState)
        return (
            <div
            className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
            ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex-wrap dark:border-[#272932] dark:bg-[#272932]"
            >
                <div className='w-full h-full flex-wrap'>
                    <div className="w-full h-[15%] border-solid mb-[25px]">
                        <GroupBar roomState={roomState}/>
                    </div>
                    <div className="w-full h-[10%] mt-[25px] flex-wrap">
                        < ParticipantsNumber roomState={roomState}/>
                    </div>
                    <div className="w-full h-[10%] mt-[25px] flex-wrap">
                    {
                        roomState.participants.map( (participant) => {
                            
                            if(roomState.role === "USER")
                            {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantUser key={participant.id} roomState={participant} userId={props.userId} role={roomState.role}/> 
                                    }
                                    </div>
                                )
                            }
                            else if (roomState.role === "OWNER") {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantOwner key={participant.id} roomState={participant} userId={props.userId} role={roomState.role}/> 
                                    }
                                    </div>
                                )

                            }
                            else if (roomState.role === "ADMIN" && participant.rooms[0].role === 'USER') {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantAdmin key={participant.id} roomState={participant} userId={props.userId} role={roomState.role}/> 
                                    }
                                    </div>
                                )

                            }
                            else if (roomState.role === "ADMIN" && participant.rooms[0].role !== 'USER') {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantAdmin1 key={participant.id} roomState={participant} userId={props.userId} role={roomState.role}/> 
                                    }
                                    </div>
                                )

                            }
                        }
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}
export default RoomSettings;