import GroupsComponent from './Groups.tsx';
import  DMComponent from './People.tsx';
import {  Outlet} from 'react-router-dom';


interface PropsType {
  userId: string;
}

const Chat = (props: PropsType) => {
  const userId = props.userId;

  return (
    <div
    //   className="chat lg:ml-[2px] lg:mr-[2px] lg:mb-[10px] lg:h-full lg:w-full lg:flex lg:100vh lg:gap-[0px] 
    // ml-[2px] mr-[2px] mt-[50px] h-full w-full   justify-around 100vh gap-[0px] mt-[20px]"

    className="chat lg:ml-[2px] lg:mr-[2px] lg:mb-[10px] lg:h-full lg:w-full lg:flex lg:100vh lg:gap-[0px] 
    ml-[2px] mr-[2px] mb-[10px] h-full w-full flex justify-around 100vh gap-[0px] mt-[20px]"
    >
      <div
        className="lg:ml-[20px] lg:mr-[-10px] lg:my-[15px] lg:h-full lg:w-full lg:flex-wrap lg:gap-[0px] lg:items-start
      ml-[20px] mr-[-10px] my-[15px] h-full w-full flex-wrap gap-[0px] items-start"
      >
        < GroupsComponent userId={userId}/>
        < DMComponent userId={userId}/>
      </div>
      <Outlet/>
    </div>
  );
};

export default Chat;
