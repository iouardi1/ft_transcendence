import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const DmRoomButton = (props) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = () =>  {
    props.socket.emit('createDm', {senderId: props.userData.userId, receiverName: props.userData.userData.username});
    setIsButtonDisabled(true);
  }

  return (
    <div className="icon w-[95%] h-full flex-wrap m-auto">
      
      <div className="icon w-full h-[50px] flex items-center">
        <div className="w-full h-full flex items-center">
          <img
            className="logoImg rounded-[40px] w-[40px] h-[40px]"
            src={props.userData.userData.image}
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
            {props.userData.userData.username}
          </div>
        </div>
        <Link 
          to="/chat/invitToGame"
          // to="/chat/dmConv"
          className="w-[50px] h-[30px] bg-[#6F37CF] rounded-[25%] mr-[10px] hover:dark:shadow-lg hover:shadow-lg"
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

              Play
            </div>
        </Link>
        <button 
          // to="/chat/dmConv/"
          type='button'
          disabled={isButtonDisabled}
          onClick={handleButtonClick}
          className={`w-[50px] h-[30px] bg-[#6F37CF] rounded-[25%] hover:dark:shadow-xl hover:shadow-xl ${isButtonDisabled ? 'bg-[#9d88c0] hover:shadow-none' : 'enabled-button'}`}
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
        </button>
      </div>
    </div>
  );
};

function ExistinUser(userData) {
  return (
    <div className='w-[350px] max-h-[80px] m-auto my-[40px] p-auto border-3 rounded-[25px] border-solid bg-[#EEEEFF]
     dark:bg-[#1A1C26] shadow-xl dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]'>
      <DmRoomButton userData={userData} socket={userData.socket}/>
    </div>
  )

}

export default function AddPeople (props) {

  const socket = props.socket;
  const userId = props.userId;
  const [addUsers, setAddUsers] = useState(null);

  const token = Cookies.get('accessToken');

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/chat/addPeople', {
        params: {
          userId: props.userId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setAddUsers(response.data)
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchData();
  
    socket.on("dmDeleted", () => {
      console.log("ADD THE FOCKING DELETED")
      fetchData();
    })
    socket.on("blocked", () => {
      fetchData();
      
    })
    socket.on("unblocked", () =>{
      fetchData();
    })
    props.socket.on("createdDm", () => {
      console.log("HEEERE");
      fetchData();
    });


  }, []);

  if (addUsers)
  {
    return (
        <div className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        ml-[-10px] mr-[15px] my-[15px] w-[55%] h-[88%] rounded-[25px] flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none  dark:border-[#272932] dark:bg-[#272932]">
              
        <div className='w-full h-full flex-wrap justify-center'>
        <div className="w-full h-[10%] m-[1px] flex items-center justify-center text-black dark:text-white text-center" 
          style={{
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
          
        {
                 
                 addUsers.map( (user) => (
                 <ExistinUser key={user.id} userData={user} userId={userId} socket={socket}/>))
        }
      
        </div>
        </div>
        
      </div>
        
    );
    }
}