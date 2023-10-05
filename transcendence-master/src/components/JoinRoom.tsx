import logoImg from "../assets/panda.svg";
import { useState, useEffect } from "react";
import axios from "axios";


const JoinRoomButton = (props: any) => {
  console.log("here: ----", props)
  const [display, setDisplay] = useState(true);
  const [password, setPassword] = useState(null);

  const toggleDiv = () => {
    setDisplay(!display);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    if (props.group.visibility === 'protected') {

      console.log('Submitted Password:', password);
      props.socket.emit('joinRoom', {visibility: "protected", password: password, roomId: props.group.id, userId: props.userId, joinDate: new Date()})
    } else {
      console.log('Submitted without password');
      props.socket.emit('joinRoom', {visibility: "public", password: password, roomId: props.group.id, userId: props.userId, joinDate: new Date()})
    }
  };

  return (
    <div className="icon w-full h-full flex-wrap justify-around m-auto">
      <div className="icon w-full h-[40px] flex justify-around items-center">
        <div className="w-full h-full flex justify-around items-center">
          <img
            className="logoImg rounded-[50px] w-[40px] h-[40px]"
            src={ props.group.image ? props.group.image  : logoImg}
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
            { props.group.RoomName }
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <button 
          type='submit'
          onClick= { toggleDiv }
          className="date w-[40px] h-[30px] bg-[#6F37CF]  text-white rounded-[25%] ml-[-65px] hover:shadow-lg"
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
          {
            props.group.visibility === "protected" && !display &&
            (
              <div className="w-fit wrap">
                <input 
                  required
                  id="i" 
                  type="text" 
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={` ${display} w-[55%] h-[40px] rounded-[25px] p-[15px] dark:bg-[#1A1C26] bg-[#EEEEFF] dark:text-white text-black text-center`}
                  style={{
                    fontFamily: "poppins",
                    fontSize: "11px",
                    fontStyle: "normal",
                    letterSpacing: "1.5px",
                    }}/>

              </div>
            )
          }
        </form>
      </div>
    </div>
  );
};

function ExistinRoom(props: any) {
  console.log("props here:---------------", props);
  return (
    <div className='w-[350px] max-h-[50px] m-auto my-[40px] p-auto border-3 rounded-[25px] border-solid bg-[#EEEEFF]
     dark:bg-[#1A1C26] shadow-xl dark:shadow-[0_25px_5px_-15px_rgba(20,0,50,0.3)]'>
      <JoinRoomButton group={props.groupsList} socket={props.socket} userId={props.userId}/>
    </div>
  )

}


export default function JoinRoom(props: any) {
  const userId = props.userId;
  const [rooms, setRooms] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/chat/groupsList', {
        params: {
          userId: props.userId,
        }
      });
      if (response.status === 200) {
        setRooms(response.data);
        // console.log("rooms i get:", rooms);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    useEffect(() => {
      fetchData();
    }, []);

    if (rooms)
    {
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
              {
                  rooms.map((room) => {
                    return (
                      < ExistinRoom key={room} groupsList={room} socket={props.socket} userId={userId}/>
                    )
                })
              }
            </div>
          </div>
          
        </div>
      )
    }
}
