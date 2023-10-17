
import { useLocation } from "react-router-dom";
import logoImg from "../assets/panda.svg";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BannedUsers from './../assets/userBanned.svg';


const GroupBar = (props) => {
    const encodedData = encodeURIComponent(props.roomState.room.id);
    if (encodedData)
    {
        return (
        <div className='w-full h-full flex-wrap justify-center'>
            <div className="w-full h-full flex p-[auto] items-center justify-center">
                <img
                    className="logoImg rounded-[50px] ml-[30px] w-[60px] h-[60px] flex justify-center items-center"
                    src={props.roomState.room.image ? `data:image/jpeg;base64,${props.roomState.room.image}` : logoImg}
                    alt={""}
                />
                <div className="w-[70%] h-full ml-[20px] flex items-center justify-center">
                    <div className=" text-black dark:text-white w-full h-[50%] flex justify-center items-center"
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
                        <Link to={`/chat/groupConv/?id=${encodedData}`} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-[20px] dark:text-white">
                                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
        </div>
        );
    }
  };



const ParticipantOwner = (props) => {
    const role = props.roomState.rooms[0].role;
    const [display, setDisplay] = useState(true);

    // console.log("props in Owner:  ", props.roomState.rooms[0]);

    const handleButtonClick = (action) => {
       if (props.socket)
       {
            console.log("THE action:", action);
            // console.log("THE action:", action);
            props.socket.emit(action, {userId: props.userId, subjectId: props.roomState.userId, roomId: props.roomState.rooms[0].RoomId});
       }
       setDisplay(true);
      };

    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
            <div className=" text-black dark:text-white w-[20%] h-full flex items-center"
            style={{
                fontFamily: "poppins",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                letterSpacing: "1.5px",
                }}
                >
                {props.roomState.username} 
            </div>
            <div className="w-full h-full flex-wrap items-center">
                <div className='w-full h-full flex items-center justify-end'>
                    <div 
                        className={`w-[70px] h-[30px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                            role === 'OWNER' ? 'opacity-[100%]' : 'opacity-[70%]' } `}
                        style={{
                            fontFamily: "poppins",
                            fontSize: "13px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            letterSpacing: "1.5px",
                        }}
                    >
                        {role}
                    </div>
                    <div className='w-[20px] h-full flex flex-row justify-end items-center ml-[10px]'>
                        <button onClick={() => {setDisplay(!display)}} 
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
                <div className="w-[95%] h-full mt-[-20px] flex justify-end items-start">
                    <div className={`${display ? "hidden" : ""} w-[150px] z-10 flex items-center bg-[#EEEEFF] dark:bg-[#1A1C26] dark:text-white rounded-[15px] text-black shadow-xl  dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]`}>
                        <ul 
                        className='w-full flex flex-col items-center text-center'
                        style={{
                        fontFamily: "poppins",
                        fontSize: "15px",
                        fontWeight: 300,
                        }}>
                            <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                <button onClick={() => handleButtonClick("transferOwnership")}>Transfer Ownership</button>
                            </li>
                           { props.roomState.rooms[0].role === 'USER' && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("promote")}>Promote</button>
                                </li>
                            )}
                           { props.roomState.rooms[0].role === 'ADMIN' && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("demote")}>Demote</button>
                                </li>
                            )}
                           { props.roomState.rooms[0].muted === false && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("mute")}>Mute</button>
                                </li>
                            )}
                           { props.roomState.rooms[0].muted && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("unmute")}>Unmute</button>
                                </li>
                            )}
                            <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                <button onClick={() => handleButtonClick("kick") }>Kick</button>
                            </li>
                            <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                <button onClick={() => handleButtonClick("ban") }>Ban</button>
                            </li>
                        </ul>    
                    </div> 
                  </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantAdmin = (props) => {
    const role = props.roomState.rooms[0].role;
    const [display, setDisplay] = useState(true);


    const handleButtonClick = (action) => {
       if (props.socket)
       {
            console.log("THE action:", action);
            // console.log("THE action:", action);
            props.socket.emit(action, {userId: props.userId, subjectId: props.roomState.userId, roomId: props.roomState.rooms[0].RoomId});
       }
       setDisplay(true);
      };
    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
            <div className=" text-black dark:text-white w-full h-full flex items-center "
            style={{
                fontFamily: "poppins",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1.5px",
                }}
                >
                {props.roomState.username} 
            </div>
            <div className="w-full h-full flex-wrap justify-end items-center">
                <div className='w-full h-full flex items-center justify-end'>    
                    <div 
                        className={`w-[70px] h-[30px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                            role === 'OWNER' ? 'opacity-[100%]' : 'opacity-[70%]'} `}
                        style={{
                            fontFamily: "poppins",
                            fontSize: "13px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            letterSpacing: "1.5px",
                        }}
                    >
                        {role}
                    </div>
                    <div className='w-[10px] h-full flex flex-row justify-end items-center ml-[20px]'>
                        <button onClick={() => {setDisplay(!display)}}
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
                <div className="w-[95%] h-full mt-[-20px] flex justify-end items-start">
                    <div className={`${display ? "hidden" : ""} w-[150px] z-10 flex items-center bg-[#EEEEFF] dark:bg-[#1A1C26] dark:text-white rounded-[15px] text-black shadow-xl  dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]`}>
                        <ul 
                        className='w-full flex flex-col items-center text-center'
                        style={{
                        fontFamily: "poppins",
                        fontSize: "15px",
                        fontWeight: 300,
                        }}>
                            { props.roomState.rooms[0].muted === false && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("mute")}>Mute</button>
                                </li>
                            )}
                           { props.roomState.rooms[0].muted && (
                                <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                    <button onClick={() => handleButtonClick("unmute")}>Unmute</button>
                                </li>
                            )}
                            <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                <button onClick={() => handleButtonClick("kick") }>Kick</button>
                            </li>
                            <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                                <button onClick={() => handleButtonClick("ban") }>Ban</button>
                            </li>
                        </ul>    
                    </div> 
                  </div>
            </div>
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
  };


const ParticipantAdmin1 = (props) => {
    const role = props.roomState.rooms[0].role;
    return (
    <div className='w-full h-full flex-wrap justify-around items-center'>
        <div className="w-full h-full flex p-[auto] items-center justify-start">
            <img
                className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px] mr-[25px]"
                src={props.roomState.image}
                alt={""}
            />
         
            <div className=" text-black dark:text-white w-full h-full flex items-center"
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
            <div className='w-[30%] h-full flex items-center justify-end mr-[30px]'>
            <div 
                className={`w-[70px] h-[30px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                    role === 'OWNER' ? 'opacity-[100%]' : 'opacity-[70%]'}`}
                style={{
                    fontFamily: "poppins",
                    fontSize: "13px",
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
         
            <div className=" text-black dark:text-white w-full h-full flex items-center"
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
                className={`w-[70px] h-[30px] text-white rounded-[25px] bg-[#6F37CF] text-center flex justify-center items-center ${
                    role === 'OWNER' ? 'opacity-[100%]' : 'opacity-[70%]'}`}
                style={{
                    fontFamily: "poppins",
                    fontSize: "13px",
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


  console.log("participantsNum: ", props);
  const [display, setDisplay] = useState(true);

  const encodedData = encodeURIComponent(props.roomState.room.id);
  if (encodedData)
  {
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
            {props.roomState.role !== "USER" && (
                <div>
                    <Link to={`/chat/bannedUsers/?id=${encodedData}`}>
                        <img 
                        className="w-[30px] h-[30px] "
                        src={BannedUsers}
                            alt="" />
    
                    </Link>
                </div>
            )}
            
            {props.roomState.role === "OWNER" && (
            <div>
                <button onClick={() => {setDisplay(!display)}}
                className={`flex items-center justify-center w-[25px] rounded-full ${!display ? "mt-[26px]" : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" 
                    fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.94 4.99939L19.001 10.0604L18.0394 11.022C17.8618 11.0074 17.6823 11 17.501 11C13.9111 11 11.001 13.9101 11.001 17.5C11.001 17.6813 11.0084 17.8608 11.023 18.0384L9.06283 19.9985C8.78596 20.2753 8.44162 20.4752 8.06386 20.5782L2.94817 21.9734C2.38829 22.1261 1.87456 21.6123 2.02726 21.0525L3.42244 15.9368C3.52547 15.559 3.7253 15.2147 4.00217 14.9378L13.94 4.99939ZM21.0312 2.96948C22.4286 4.36695 22.4286 6.63268 21.0312 8.03014L20.061 8.99939L15 3.93939L15.9705 2.96948C17.368 1.57202 19.6337 1.57202 21.0312 2.96948ZM14.2792 13.9754C14.5939 15.0656 13.9396 16.1991 12.838 16.4716L12.2538 16.6161C12.2089 16.9038 12.1855 17.199 12.1855 17.4998C12.1855 17.8145 12.2111 18.123 12.2601 18.4232L12.7996 18.5532C13.9121 18.8211 14.5734 19.9661 14.2496 21.0636L14.0633 21.6949C14.5024 22.0805 15.0029 22.3937 15.5474 22.6165L16.0407 22.0977C16.8293 21.2685 18.1515 21.2687 18.9398 22.0982L19.4385 22.623C19.9821 22.4027 20.4821 22.0925 20.9213 21.7101L20.7233 21.0242C20.4085 19.9339 21.0629 18.8005 22.1645 18.528L22.7482 18.3835C22.7931 18.0958 22.8165 17.8006 22.8165 17.4998C22.8165 17.1851 22.7909 16.8765 22.7418 16.5762L22.2029 16.4464C21.0904 16.1785 20.4291 15.0335 20.7529 13.9359L20.9391 13.3051C20.4999 12.9193 19.9995 12.6061 19.4549 12.3833L18.9618 12.9018C18.1732 13.7311 16.8509 13.7309 16.0627 12.9013L15.5639 12.3765C15.0203 12.5967 14.5204 12.9068 14.0811 13.2892L14.2792 13.9754ZM17.501 18.9998C16.7004 18.9998 16.0513 18.3282 16.0513 17.4998C16.0513 16.6714 16.7004 15.9998 17.501 15.9998C18.3016 15.9998 18.9507 16.6714 18.9507 17.4998C18.9507 18.3282 18.3016 18.9998 17.501 18.9998Z" fill="#8F8F8F"/>
                    </svg>
                </button>
                <div className={`${display ? "hidden" : ""} w-[150px] z-10 flex items-center bg-[#EEEEFF] dark:bg-[#1A1C26] dark:text-white rounded-[15px] text-black shadow-xl  dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]`}>
                    <ul 
                    className='w-full flex flex-col items-center text-center'
                    style={{
                        fontFamily: "poppins",
                        fontSize: "15px",
                        fontWeight: 300,
                    }}>
                      <li className='w-full rounded-[15px] hover:text-white hover:bg-[#6F37CF]'>
                        <button onClick={() => setDisplay(true)}>Change Password</button>
                      </li>
                    </ul>    
                  </div>
            </div>
            )}
        </div>
        <hr className=" w-[90%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    );
}
};

const RoomSettings = (props) => {
    const userId = props.userId;
    const socket = props.socket;

    const navigate = useNavigate();
  
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const receivedData = params.get('id');

    const [roomState, setRoomState] = useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    
    useEffect(() => {
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
    fetchData();
    
    socket.on("joinedRoom", () => {
            console.log("HUNAAAA");
            fetchData();
            // navigate('/chat');
        })
        socket.on("banned", (bannedId: string) => 
        {
            if (userId === bannedId)
            {
                console.log("HUNAAAA2");
                navigate('/chat', {replace: true});
            }
            else
            {
                console.log("HUNAAAA3");
                fetchData();
            }
        })
        socket.on("muted", () => {
            fetchData();
        })
        socket.on("unmuted", () => {
            fetchData();
        })
        socket.on("promoted", () => {
                fetchData();
            })
            socket.on("demoted", () => {
                fetchData();
            })
            socket.on("ownership", () => {
                fetchData();
            })
            socket.on("leftRoom", (left: string) => {
                if (userId === left)
                {
                    console.log("HUNAAAA2");
                    navigate('/chat', {replace: true});
                }
                else
                {
                    fetchData();
                }
                
            })
            socket.on('kicked', (kickedId: string) =>
            {
                console.log("HUNAAAA1");
                if (userId === kickedId)
                {
                    console.log("HUNAAAA2");
                    navigate('/chat', {replace: true});
                }
                else
                {
                    console.log("HUNAAAA3");
                    fetchData();
                }
            })
            
        }, []);
        
        
        
        if (roomState)
        {
            const handleSubmit = (e) => {
                e.preventDefault();
                if (roomState.role !== "OWNER")
                {
                    socket.emit("leaveRoom", roomState.room.id);
                    setIsButtonDisabled(true);
                }
            };
            // console.log("roomStte: ", roomState);
            return (
                <div
                className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
            ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex-wrap dark:border-[#272932] dark:bg-[#272932]"
            >
                <div className='w-full h-full flex-wrap'>
                    <div className="w-full h-[15%] border-solid mb-[25px] flex items-center">
                        <GroupBar roomState={roomState} socket={props.socket}/>
                    </div>
                    <div className="w-full h-[10%] mt-[25px] flex-wrap">
                        < ParticipantsNumber roomState={roomState}  socket={props.socket}/>
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
                                        <ParticipantOwner key={participant.id} roomState={participant} userId={props.userId} role={roomState.role} socket={props.socket}/> 
                                    }
                                    </div>
                                )

                            }
                            else if (roomState.role === "ADMIN" && participant.rooms[0].role === 'USER') {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantAdmin key={participant.id} roomState={participant} userId={props.userId} role={roomState.role} socket={props.socket}/> 
                                    }
                                    </div>
                                )

                            }
                            else if (roomState.role === "ADMIN" && participant.rooms[0].role !== 'USER') {
                                return(
                                    <div className="w-full h-full">
                                    {
                                        <ParticipantAdmin1 key={participant.id} roomState={participant} userId={props.userId} role={roomState.role} socket={props.socket}/> 
                                    }
                                    </div>
                                )

                            }
                        }
                        )
                    }
                    </div>
                </div>
                    <div className=" w-full h-[10%] flex justify-center items-start mt-[-50px]">
                        {roomState.role !== "OWNER" && (
                            <button 
                            type='submit'
                            disabled={isButtonDisabled}
                            onClick= { handleSubmit }
                            className={`w-[60px] h-[30px] bg-[#D7385E]  text-white rounded-[25%] hover:shadow-lg dark:shadow-[0_25px_5px_-15px_rgba(60,0,50,0.3)] ${isButtonDisabled ? 'opacity-[50%] hover:shadow-none' : 'enabled-button'}`}
                            style={{
                                fontFamily: "poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "normal",
                                letterSpacing: "0.13px",
                            }}
                            >
                            Leave
                            </button>
                        )}
                        {roomState.role === "OWNER" && (
                            <button 
                            type='submit'
                            disabled={roomState.role === "OWNER"}
                            onClick= { handleSubmit }
                            className={`w-[60px] h-[30px] bg-[#D7385E]  text-white rounded-[25%] hover:shadow-lg dark:shadow-[0_25px_5px_-15px_rgba(60,0,50,0.3)] opacity-[50%] hover:shadow-none`}
                            style={{
                                fontFamily: "poppins",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 600,
                                lineHeight: "normal",
                                letterSpacing: "0.13px",
                            }}
                            >
                            Leave
                            </button>
                        )}
                    </div>
            </div>
        );
    }
}
export default RoomSettings;
