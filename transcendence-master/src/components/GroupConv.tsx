
import React, { useEffect, useState } from 'react';
import logoImg from "../assets/panda.svg";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

const ContactBar = (barData) => {
    return (
        <div className='w-full h-full flex-wrap justify-center'>
      <div className="w-full h-full flex p-[auto] items-center justify-between">
          <img
            className="logoImg rounded-[50px] ml-[30px] w-[40px] h-[40px]"
            src={ barData.barData.roomImage ? barData.barData.roomImage : logoImg }
            alt={""}
          />
          <div className="w-[70%] h-full ml-[20px] flex items-center">
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
              {barData.barData.roomName ? barData.barData.roomName : ""}
            </div>
            </div>
            <div className='w-[20%] h-full flex items-center justify-end'>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/invToRoom" 
                    className="flex items-center justify-center bg-[#6F37CF] hover:bg-[#4e1ba7] text-white font-bold h-[25px] w-[25px] rounded-full m-[10px] mr-[15px]" style={{
                    fontFamily: "Roboto",
                    fontSize: "25px",
                    }}>+</Link>
                </div>
                <div className='w-full h-full flex flex-row justify-end items-center'>
                    <Link to="/chat/roomSettings" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
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
  
  const Mssg = (msgData) => {

    if (msgData.msgData[0].senderId !== msgData.userId) {
      // console.log("userId from props: " + msgData.userId);
      // console.log("userId from Mois: " + msgData.msgData[0]);
      return (
        <div className=" w-[70%] max-h-[60%] m-[15px] ">
          <div className="w-full h-full flex">
            <img
              className="logoImg rounded-[50px] w-[40px] h-[40px]"
              src={msgData.msgData[1] ? msgData.msgData[1] : logoImg}
              alt={""}
            />
            <div
              className="p-[10px] ml-[15px] max-w-[60%] w-fit h-fit bg-[#EEEEFF] rounded-[25px] dark:bg-[#1A1C26] text-left text-black dark:text-white text-clip "
              style={{
                fontFamily: "poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                letterSpacing: "1px",
                overflowWrap: "break-word",
              }}
            >
              {msgData.msgData[0].messageContent}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full max-h-[60%] m-[15px] ml-[-10px]">
          <div className="w-full h-full flex flex-row-reverse">
            <img
              className="logoImg rounded-[50px] w-[40px] h-[40px] ml-[10px]"
              src={msgData.msgData[1] ? msgData.msgData[1] : logoImg}
              alt={"${defpaultConvdata.name}"}
            />
            <div
              className="p-[10px] ml-[15px] max-w-[60%] w-fit h-fit bg-[#6F37CF] rounded-[25px] dark:bg-[#1A1C26] text-left text-white dark:text-white text-clip overflow-hidden"
              style={{
                fontFamily: "poppins",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1px",
                overflowWrap: "break-word",
              }}
            >
              {msgData.msgData[0].messageContent}
            </div>
          </div>
        </div>
      );
    }
  };

  interface MyComponentProps {
    dataState: any; // Replace 'any' with the actual type of dataState
  }

const GroupConveComponent = (props:any) => {

  const socket = props.socket;

  const [dataState, setDataState] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const receivedData = params.get('id');
  

  console.log("------->", props);


  const [message, setMessage] = useState('');
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/chat/groups/${receivedData}`, {
        params: {
          userId: props.userId,
        }
      });
      if (response.status === 200) {
        setDataState(response.data);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
      fetchData();
    console.log("---chi haaaja");
    
  }, []);


    // const [message, setMessage] = useState('');
    // const [socket, setSocket] = useState(null);
  
    // useEffect(() => {
    //   const socketInstance = io('http://localhost:3003', {
    //     auth: {
    //       token: props.userId,
    //     }
    //   });
    //   setSocket(socketInstance);
    //   socketInstance.on("createdMessage", () => {
    //     fetchData();
    //   })

    //   return () => {
    //     socketInstance.disconnect();
    //   };
    // }, []);


    const handleSubmit = (e) => {
      console.log(message);
      e.preventDefault(); 
      
      // console.log("dataState in conv component:", dataState);
      
      if (socket && message.trim() !== '') {
        // Send the message to the server
        socket.emit('sendMessage', { messageContent: message, dmId: null, userId: props.userId, roomId: dataState.roomId, sentAt: new Date() });
  
        // Clear the input fieldgqwwqg
        setMessage('');
      }
    };



  // console.log("data in groupConv: ", props.userId)

  if (dataState)
  {
    return (
        <div
        className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex flex-wrap dark:border-[#272932] dark:bg-[#272932]"
      >
          <div className="w-full h-[10%] border-solid mb-[25px]">
            <ContactBar barData={dataState}/>
          </div>
          <div className="w-full h-[77%] mt-[25px] flex-wrap overflow-hidden overflow-y-scroll">
          {
              dataState.msgs.map((msg) => (
              <Mssg key={msg.id} msgData={msg} userId={props.userId} />
            ))
          }
          </div>
          <div className="w-[90%] h-[50px] border-solid flex  m-auto items-center">
              <img
                className="logoImg rounded-[50px] w-[40px] h-[40px]"
                src={ dataState.roomImage ? dataState.roomImage : logoImg}
                alt={""}
              />
              <form 
                onSubmit={handleSubmit}
                className="w-full h-[40px] ml-[15px] flex justify-around">
                  <div className="w-full h-full bg-[#EEEEFF] dark:bg-[#1A1C26] dark:text-white rounded-[10px]">
          
                      
                      <input 
                        type="text"
                        placeholder="Type your text.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-[95%] h-full bg-transparent flex items-center justify-center ml-[10px]" style={{
                          fontFamily: "poppins",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          letterSpacing: "1.5px",
                      }}>
                      </input>
                    </div>
                    <button
                      type='submit'
                      className="w-[10%] h-full m-auto flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" fill="#6F37CF"  stroke="currentColor" strokeWidth="2"    strokeLinecap="round" strokeLinejoin="round" 
                         className="w-6 h-6 text-[#6F37CF]">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                </form>
          </div>
      </div>
    );
  }
}
export default GroupConveComponent;