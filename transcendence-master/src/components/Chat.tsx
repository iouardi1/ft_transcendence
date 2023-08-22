// import  { Link } from 'react-router-dom';

const Chat = () => {
  return (
    <div className="chat ml-[2px] mr-[25px] mb-[15px] h-full w-full flex flex-wrap 100vh gap-[0px]">
      <div className="ml-[25px] mr-[1px] my-[15px] h-full w-full flex-1 flex flex-wrap gap-[0px] items-start">
        <div className="w-[90%] h-[32%] rounded-[25px] border-solid flex flex-3 border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
        </div>
        <div className="mt-[-99px] w-[90%] h-[55%] rounded-[25px]  border-solid flex flex-4 border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
        </div>
      </div>
      <div className="my-[15px] w-[70%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
      </div>
    </div> 
  )
}




export default Chat;
