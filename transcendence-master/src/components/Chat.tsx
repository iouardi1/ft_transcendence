// import  { Link } from 'react-router-dom';

const Chat = () => {
  return (
    <div className="chat ml-[25px] mr-[25px] h-full w-full flex grid-cols-2 justify-around">
      <div className="mr-[20px] my-[15px] h-full w-full grid grid-row-2 divide-y-[300px]">
        <div className="p-[10px] w-[90%] h-[70%] rounded-[25px] flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
        </div>
        <div className="w-[90%] h-[80%] rounded-[25px] flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
        </div>
      </div>
      <div className="my-[15px] w-[70%] h-[87%] rounded-[25px] flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
      </div>
    </div> 
  )
}




export default Chat;
