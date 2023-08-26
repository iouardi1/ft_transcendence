// import  { Link } from 'react-router-dom';
// import React from 'react';
import logoImg from '../assets/panda.svg';



interface ConvData  {
    id: number;
    name: string;
    image: string;
    message1:  string;
    message2:  string;
    date: string;
    group: string;
    online: string;
}

const DMComp = () =>
{
  const defaultConvData: ConvData = {
    id: 1,
    name: 'Mohamed',
    image: logoImg,
    message1: 'Hello everyone!',
    message2: 'Hello back!',
    date: 'Today, 12:15pm',
    group: 'Friends Forever',
    online: 'Online - Last seen, 2.02pm' 
  };
  
  return (
    <div  className='icon w-full h-[40px] mb-[15px] flex-wrap'>
    <div  className='icon w-full h-[40px] mb-[15px] flex justify-between'>
      <div className='w-[70%] h-full '>
        <img  className='logoImg rounded-[50px] w-[40px] h-[40px]' src={defaultConvData.image} alt={'${defaultConvdata.name}'} />
      
        <div className='groupName mb-[40px] text-black dark:text-white w-full mt-[-40px] ml-[45px]' style={{ fontFamily: 'Roboto', fontSize: '15px',fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.75px'}}>
          {defaultConvData.group}
        </div>
        <div className='groupMsg text-black dark:text-white w-[95px] mt-[-40px] ml-[45px]' style={{ fontFamily: 'Roboto', fontSize: '13px',fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '0.65px'}} >
          {defaultConvData.message1}
        </div>
        </div>
      <div className='date w-[30%] ml-[10%]' style={{color: '#7C7C7C', fontFamily: 'Roboto', fontSize: '13px', fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '0.13px' }}>
          {defaultConvData.date}
      </div>
    </div>
    <hr className=" w-[90%] h-[1px] my-[-9px] bg-[#2C2C2CBD] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]"></hr>
    </div>
    
  );
};

const ContactBar = () =>
{
  const defaultConvData: ConvData = {
    id: 1,
    name: 'Mohamed',
    image: logoImg,
    message1: 'Hello everyone!',
    message2: 'Hello back!',
    date: 'Today, 12:15pm',
    group: 'Friends Forever',
    online: 'Online - Last seen, 2.02pm'
  };
  
  return (
    <div  className='w-full h-full p-[20px] flex'>
      <div className='w-[100%] flex flex-wrap'>
        <img  className='logoImg rounded-[50px] w-[40px] h-[40px]' 
              src={defaultConvData.image} 
              alt={'${defaultConvdata.name}'} />
              <div className='w-full h-[40px] mt-[-42px] ml-[55px] justify-around'>
                <div className=' text-black dark:text-white w-full h-[50%]' style={{ fontFamily: 'Roboto', fontSize: '20px',fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '1.5px'}}>
                  {defaultConvData.name}
                 </div>
                <div className='w-full h-[50%] mt-[7px] text-black dark:text-white'   style={{ fontFamily: 'Roboto', fontSize: '15px',fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '1.5px'}}>
                  {defaultConvData.online}
                </div>
                <hr className=" w-[90%] h-[1px] my-[15px] bg-[#474444bd] opacity-[15%] border-0 rounded  dark:bg-[#8a8abd] dark:opacity-[10%]">
                </hr>
              </div>
        </div>
      </div>
  );
};

const MssgSent = () => {
  const defaultConvData: ConvData = {
    id: 1,
    name: 'Mohamed',
    image: logoImg,
    message1: 'Hello everyone!',
    message2: 'Hello back!',
    date: 'Today, 12:15pm',
    group: 'Friends Forever',
    online: 'Online - Last seen, 2.02pm'
  };
  return (
    <div className='w-full h-full m-[15px]'>
      <div className='w-full h-full flex'>
        <div className="w-[15px] h-[15px] mt-[50px] bg-[#EEEEFF] rounded-full dark:bg-[#1A1C26]">
          </div>
        <div className='p-[10px] ml-[15px] mt-[10px] w-[150px] h-[40px] bg-[#EEEEFF] rounded-[25px] dark:bg-[#1A1C26] text-center text-black dark:text-white' style={{fontFamily: 'Roboto', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '1px'}}>
          {defaultConvData.message1}
        </div>

      </div>
    </div>
  );
};
// const MssgReceived = () => {
//   const defaultConvData: ConvData = {
//     id: 1,
//     name: 'Mohamed',
//     image: logoImg,
//     message1: 'Hello everyone!',
//     message2: 'Hello back!',
//     date: 'Today, 12:15pm',
//     group: 'Friends Forever',
//     online: 'Online - Last seen, 2.02pm'
//   };
//   return (
//     <div className='w-full h-full m-[15px] flex flex-row-reverse'>
//       <div className='w-full h-fit flex'>
//         <div className="w-[15px] h-[15px] mt-[50px] bg-[#EEEEFF] rounded-full dark:bg-[#1A1C26]">
//           </div>
//         <div className='p-[10px] mr-[30px] mt-[10px] w-[130px] h-[40px] bg-[#EEEEFF] rounded-[25px] dark:bg-[#1A1C26] text-center text-black ' style={{fontFamily: 'Roboto', fontSize: '17px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '1px'}}>
//           {defaultConvData.message2}
//         </div>

//       </div>
//     </div>
//   );
// };


const Chat = () => {
  return (
    <div className="chat lg:ml-[2px] lg:mr-[2px] lg:mb-[10px] lg:h-full lg:w-full lg:flex lg:100vh lg:gap-[0px] 
    ml-[2px] mr-[2px] mb-[10px] h-full w-full flex 100vh gap-[0px]">
      <div className="lg:ml-[20px] lg:mr-[-10px] lg:my-[15px] lg:h-full lg:w-full lg:flex-wrap lg:gap-[0px] lg:items-start
      ml-[20px] mr-[-10px] my-[15px] h-full w-full flex-wrap gap-[0px] items-start">
        <div className="lg:w-[90%] lg:h-[32%] lg:rounded-[25px] lg:border-solid lg:flex-wrap lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        w-[90%] h-[32%] rounded-[25px] border-solid flex-wrap border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
          <div className="group ml-[25px] text-black dark:text-white" style={{fontFamily: 'Roboto', fontSize: '30px', fontStyle: 'normal', fontWeight: 700, letterSpacing: '1.5px' }}>Groups
          </div>
          <div className='h-[80%] convs my-[10px] ml-[10px] overflow-y-scroll'>
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
              < DMComp /> 
          </div>
        </div>
        <div className="lg:mb-[5px] lg:mt-[10px] lg:w-[90%] lg:h-[55%] lg:rounded-[25px]  lg:border-solid lg:flex-wrap lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        mb-[5px] mt-[10px] w-[90%] h-[55%] rounded-[25px]  border-solid flex-wrap border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
          <div className="dms ml-[25px] text-black dark:text-white" style={{fontFamily: 'Roboto', fontSize: '30px', fontStyle: 'normal', fontWeight: 700, letterSpacing: '1.5px' }}>People
            </div>
            <div className='convs h-[85%] overflow-y-scroll my-[15px] ml-[10px]'>
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
            < DMComp /> 
          </div>
        </div>
      </div>
      <div className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
      ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex flex-wrap dark:border-[#272932] dark:bg-[#272932]">
        <div className='w-full h-[10%] border-solid mb-[25px]'>
           <ContactBar />
        </div>
        <div className='w-full h-[70%] mt-[25px] flex-wrap'>
          < MssgSent /> 
        </div>
        <div className='w-full h-[10%] border-solid'>
        </div>
      </div>
    </div> 
  )
}




export default Chat;
