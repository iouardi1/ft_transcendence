import DMComp from './DM.tsx';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function DMsComponent (props:any)
{
  console.log("props in People:", props);
    const [dmData, setDmData] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/chat/dms', {
        params: {
          userId: props.userId,
        }
      });
      if (response.status === 200) {
        setDmData(response.data)
        
        
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchData();

    props.socket.on("dmDeleted", () => {
    console.log("blocked BITCH");
    fetchData();
  })
    props.socket.on("createdDm", () => {
      console.log("HEEERE");
      fetchData();
    });
    props.socket.on("createdMessage", () => {
      console.log("HEEERE");
      fetchData();
    });
    props.socket.on("blocked", () => {
      console.log("blocked BITCH");
      fetchData();
    })
    props.socket.on("unblocked", () => {
      console.log("blocked BITCH");
      fetchData();
    })
  }, []);

    if (dmData)
    {
        return (
                <div className="lg:mb-[5px] lg:mt-[10px] lg:w-[90%] lg:h-[55%] lg:rounded-[25px]  lg:border-solid lg:flex-wrap lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
            mb-[5px] mt-[10px] w-[90%] h-[55%] rounded-[25px]  border-solid flex-wrap border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]"
            >
                <div className="dms ml-[25px] text-black dark:text-white flex justify-between items-center mb-[15px]">
                <div style={{
                    fontFamily: "poppins",
                    fontSize: "25px",
                    fontStyle: "normal",
                    fontWeight: 900,
                    letterSpacing: "1.5px",
                }} >
                People
                </div>
                <Link to="addpeople" className="flex items-center justify-center bg-[#6F37CF] hover:bg-[#4e1ba7] text-white font-bold h-[25px] w-[25px] rounded-full m-[10px] mr-[15px]" style={{
                fontFamily: "Roboto",
                fontSize: "25px",
                }}>+</Link>
                </div>
            <div className="convs h-[85%] overflow-y-scroll my-[15px] ml-[10px]">
            {
                    
              dmData.map((dm) => (
                <DMComp key={dm.id} dmData={dm} userId={props.userId}/>))
            }
            </div>
          </div>
        );
    }
}

export default DMsComponent;