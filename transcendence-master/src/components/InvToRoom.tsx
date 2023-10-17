import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const InvToRoomButton = (props) => {
  
  console.log("props:=-------------", props);
  console.log("props userId d invitee:=-------------", props.dataState.dataState.userId);
  console.log("props userId d sender:=-------------", props.dataState.userId);
  console.log("props: roomId=-------------", props.dataState.roomId);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [display, setDisplay] = useState(true);


  const toggleDiv = () => {
    setDisplay(!display);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally

      props.dataState.socketId.emit('roomInvite', 
      {
        invitee: props.dataState.dataState.userId, 
        senderId: props.dataState.userId,
        roomId: props.dataState.roomId,
        notifId: null,
      })
    
    setIsButtonDisabled(true);
  };

  return (
    <div className="icon w-[95%] h-full flex-wrap m-auto">
      
      <div className="icon w-full h-[50px] flex items-center">
        <div className="w-full h-full flex items-center">
          <img
            className="logoImg rounded-[40px] w-[40px] h-[40px]"
            src={props.dataState.dataState.image}
            alt={""}
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
            {props.dataState.dataState.displayName}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}>
          <button 
            // here we need to send a notif to the user and desactivate the click button for him once he clicks waiting for the feedback
            type='submit'
            disabled={isButtonDisabled}
            onClick= { toggleDiv }
            className={`w-[50px] h-[30px] bg-[#6F37CF] rounded-[25%] mr-[10px] hover:dark:shadow-lg hover:shadow-lg ${isButtonDisabled} ? 'bg-[#9d88c0] hover:shadow-none' : 'enabled-button' `}
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

                Invite
              </div>
          </button>
        </form>
      </div>
    </div>
  );
};

function ExistinUser(props) {
  return (
    <div className='w-[350px] max-h-[80px] m-auto my-[40px] p-auto border-3 rounded-[25px] border-solid bg-[#EEEEFF]
     dark:bg-[#1A1C26] shadow-xl dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]'>
      <InvToRoomButton dataState={props}/>
    </div>
  )

}

export default function invToRoom (props) {

  const userId = props.userId;
  const socket = props.socket;


  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const receivedData = params.get('id');

  const [dataState, setDataState] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/chat/invToRoom/${receivedData}`, {
        params: {
          userId: userId,
        }
      });
      if (response.status === 200) {
        setDataState(response.data);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

      fetchData();
  
      socket.on("blocked", () => {
        console.log("blocked BITCH");
        fetchData();
      })
      socket.on("unblocked", () => {
        console.log("unblocked BITCH");
        fetchData();
      })
      socket.on("banned", () => {
        console.log("banned BITCH");
        fetchData();
      })
      socket.on("unbanned", () => {
        console.log("banned BITCH");
        fetchData();
      })
      socket.on("kicked", () => {
        console.log("banned BITCH");
        fetchData();
      })
      socket.on("leftRoom", () => {
        console.log("banned BITCH");
        fetchData();
      })
      socket.on("joinedRoom", () => {
        console.log("banned BITCH");
        fetchData();
      })

      //need to listen to a new event if user has joined room on his own
  }, []);

  if (dataState)
  {
    console.log("dataState:  ", dataState);

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
              Suggestions
        </div>
        <hr className=" w-[50%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]">
        </hr>
        <div className="h-[88%] convs  overflow-y-scroll">
        {
          dataState.map((users) => (
            < ExistinUser key={users.id} dataState={users} socketId={socket} roomId={Number(receivedData)} userId={props.userId}/>
          ))
        }
      
        </div>
        </div>
        
      </div>
        
    );
  }
}