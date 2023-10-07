import React, { useState } from "react";
// import DMConveComponent from "./DMConvComp.tsx";
// import GroupsComponent from "./Groups.tsx";
// import DMsComponent from "./People.tsx";



function CreateRoom(props: any) {

  const [display, setDisplay] = useState("hidden")
  const [clicked, setClicked] = useState("")

  const [roomName, setRoomName] = useState(null)
  const [image, setImage] = useState(null)
  const [password, setPassword] = useState("")


  console.log("props in create room : ", props)
  
  const buttonOptions = [
    { label: 'Public' , id:'Public', dispalyInput: () => {
      setDisplay("hidden")
      setClicked("public")
    }},
    { label: 'Protected', id:'Protected', dispalyInput: () => {
      setDisplay("")
      setClicked("protected")
    }},
    { label: 'Private', id:'Private', dispalyInput: () => {
      setDisplay("hidden")
      setClicked("private")
    }},
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("password here-----------------", password)
    props.socket.emit('createRoom', {ownerId: props.userId, roomName: roomName, joinTime: new Date(), visibility: clicked, image: image, password: password})
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
      ml-[-10px] mr-[15px] my-[15px] w-[55%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none  dark:border-[#272932] dark:bg-[#272932]">
        <div className='w-full h-full flex-wrap justify-center'>
          <div className="w-full h-[10%] m-auto flex items-center justify-center text-black dark:text-white text-center" style={{
                  fontFamily: "poppins",
                  fontSize: "25px",
                  fontStyle: "normal",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
              }} >
                Create Room

          </div>
          <hr className=" w-[50%] h-[1px] m-auto bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]">
          </hr>
          <div className="w-full h-[100%] mt-[-120px] flex flex-col justify-center">
            <div className="w-full h-[10%]  flex flex-row justify-center" >
              <label className="w-[40%] text-black dark:text-white" style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "1.5px",
                }}>Group Name </label>
              <input required
                onChange={(e) => setRoomName(e.target.value)}
                id="i" type="text" placeholder="Your group's name.." className="w-[55%] h-[40px] rounded-[25px] p-[15px] dark:bg-[#1A1C26] bg-[#EEEEFF] dark:text-white text-black text-center" 
                style={{
                  fontFamily: "poppins",
                  fontSize: "15px",
                  fontStyle: "normal",
                  letterSpacing: "1.5px",
                  }}/>
            </div>
            <div className="w-full h-[10%] flex flex-row justify-center" >
              <label className="w-[40%] text-black dark:text-white" style={{
                fontFamily: "poppins",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "1.5px",
                }}>Group Picture
              </label>
            
              <input 
                required
                className="form-input w-[55%] file:w-[100%] file:h-[40px] file:border-none file:text-[#8F8F8F] file:dark:text-white file:rounded-[25px] file:dark:bg-[#1A1C26] file:bg-[#EEEEFF] file:hover:bg-[#6F37CF] file:dark:hover:bg-[#6F37CF] file:p-[5px] file:hover:text-white"
                style={{
                  fontFamily: "poppins",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight:400,
                  letterSpacing: "1.5px",
                  }} 
                  onChange={(e) => setImage(e.target.value)}
                type="file" 
                accept="file_extension|image/*"
                name="" 
                id=""/>
            </div>
          
            <div className="w-full h-[15%] flex justify-center items-end" >
              <label className=" text-black dark:text-white" style={{
                fontFamily: "poppins",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "1.5px",
                }}>Group Type
                </label>
              
            </div>
            <div className={`space-x-5 h-[15%] flex justify-center items-end`}>
              {buttonOptions.map((option, index) =>
              (
                <button
                  type="button"
                  key={index}
                  className={`${option.label === clicked ? "bg-[#6F37CF] text-white" : "bg-[#EEEEFF] dark:bg-[#1A1C26]"}   hover:bg-[#6F37CF] dark:hover:bg-[#6F37CF] hover:text-white dark:text-white text-[#8F8F8F] font-semibold py-2 px-4 rounded-md` }
                  onClick={option.dispalyInput}
                  
                  id='option.id'
                  style={{
                    fontFamily: "poppins",
                    fontSize: "15px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    letterSpacing: "1.5px",
                    }}
                >
                {option.label}
                </button>
              )
              )}
              
            </div>
            <div className="w-full flex mt-[20px] items-stretch justify-center">
              <input 
                required={display === "" ? true : false} 
                id="i" 
                type="password" 
                placeholder="Your group's password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className={` ${display}  w-[55%] h-[40px] rounded-[25px] p-[15px] dark:bg-[#1A1C26] bg-[#EEEEFF] dark:text-white text-black text-center`} 
                style={{
                  fontFamily: "poppins",
                  fontSize: "13px",
                  fontStyle: "normal",
                  letterSpacing: "1.5px",
                  }}/>
            </div>
          </div>
          <div className="flex flex-row mt-[-50px] justify-center items-end">
            <button
              type='submit'
              className="bg-[#6F37CF] hover:bg-[#6F37CF] dark:hover:bg-[#451e88] text-white font-semibold py-2 px-4 rounded-md">
                Submit
            </button>

          </div>
        </div>
    </form>
    );
}

export default CreateRoom;
