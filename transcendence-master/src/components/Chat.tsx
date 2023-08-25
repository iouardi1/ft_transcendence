// import  { Link } from 'react-router-dom';
// import React from 'react';
import logoImg from '../assets/panda.svg';



interface ConvData  {
    id: number;
    name: string;
    image: string;
    message:  string;
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
    message: 'Hello everyone!',
    date: 'Today, 12:15pm',
    group: 'Friends Forever',
    online: 'Online - Last seen, 2.02pm' 
  };
  
  return (
    <div  className='icon w-full h-[40px] ml-[-120px] mb-[15px]'>
      <img  className='logoImg rounded-[50px] w-[40px] h-[40px]' src={defaultConvData.image} alt={'${defaultConvdata.name}'} />
  
      <div className='groupName mb-[40px] text-black dark:text-white w-[150px] mt-[-40px] ml-[45px]' style={{ fontFamily: 'Roboto', fontSize: '15px',fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.75px'}}>
        {defaultConvData.group}
      </div>
      <div className='groupMsg text-black dark:text-white w-[150px] mt-[-40px] ml-[45px]' style={{ fontFamily: 'Roboto', fontSize: '13px',fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '0.65px'}} >
        {defaultConvData.message}
      </div>
      <div className='date w-[90px] mt-[-30px] ml-[190px]' style={{color: '#7C7C7C', fontFamily: 'Roboto', fontSize: '13px', fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '0.13px' }}>
          {defaultConvData.date}
      </div>
      <hr className=" w-[300px] h-[1px] my-[30px] bg-[#2C2C2CBD] opacity-[65%] border-0 rounded  dark:bg-[#474444bd]"></hr>
  
    </div>
  );
};

const ContactBar = () =>
{
  const defaultConvData: ConvData = {
    id: 1,
    name: 'Mohamed',
    image: logoImg,
    message: 'Hello everyone!',
    date: 'Today, 12:15pm',
    group: 'Friends Forever',
    online: 'Online - Last seen, 2.02pm'
  };
  
  return (
    <div  className='w-full h-full p-[20px] flex'>
      <div className='w-[100%] flex'>
        <img  className='logoImg rounded-[50px] w-[40px] h-[40px]' 
              src={defaultConvData.image} 
              alt={'${defaultConvdata.name}'} />
              <div className='w-[80%] h-full  ml-[25px] justify-left'>
                <div className=' text-black dark:text-white w-full h-[50%]' style={{ fontFamily: 'Roboto', fontSize: '20px',fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '1.5px'}}>
                  {defaultConvData.name}
                  </div>
                  <div className='w-full h-[50%] mt-[7px] text-black dark:text-white'   style={{ fontFamily: 'Roboto', fontSize: '15px',fontStyle: 'normal', fontWeight: 300, lineHeight: 'normal', letterSpacing: '1.5px'}}>
                  {defaultConvData.online}
                  </div>
                  <hr className=" w-[90%] h-[1px] my-[15px] bg-[#2C2C2CBD] opacity-[65%] border-0 rounded  dark:bg-[#474444bd]"></hr>
              </div>
              
      
      </div>
    </div>
  );
};


const Chat = () => {
  return (
    <div className="chat lg:ml-[2px] lg:mr-[2px] lg:mb-[10px] lg:h-full lg:w-full lg:flex lg:flex-wrap lg:100vh lg:gap-[0px] 
    ml-[2px] mr-[2px] mb-[10px] h-full w-full flex flex-wrap 100vh gap-[0px]">
      <div className="lg:ml-[20px] lg:mr-[-10px] lg:my-[15px] lg:h-full lg:w-full lg:flex-1 lg:flex lg:flex-wrap lg:gap-[0px] lg:items-start
      ml-[20px] mr-[-10px] my-[15px] h-full w-full flex-1 flex flex-wrap gap-[0px] items-start">
        <div className="lg:w-[90%] lg:h-[32%] lg:rounded-[25px] lg:border-solid lg:flex lg:flex-row lg:flex-3 lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        w-[90%] h-[32%] rounded-[25px] border-solid flex flex-3 border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
          <div className="group ml-[25px] text-black dark:text-white" style={{fontFamily: 'Roboto', fontSize: '30px', fontStyle: 'normal', fontWeight: 700, letterSpacing: '1.5px' }}>Groups
          </div>
          <div className='convs w-full h-full mt-[70px] align'>
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
          </div>
        </div>
        <div className="lg:mb-[5px] lg:mt-[-97px] lg:w-[90%] lg:h-[55%] lg:rounded-[25px]  lg:border-solid lg:flex lg:flex-4 lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
        mb-[5px] mt-[-97px] w-[90%] h-[55%] rounded-[25px]  border-solid flex flex-4 border-[#FFFFFF] bg-[#FFFFFF]  shadow-none dark:border-[#272932] dark:bg-[#272932]">
          <div className="dms ml-[25px] text-black dark:text-white" style={{fontFamily: 'Roboto', fontSize: '30px', fontStyle: 'normal', fontWeight: 700, letterSpacing: '1.5px' }}>People
            </div>
            <div className='convs mt-[70px] ml-[10px]'>
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
            { < DMComp /> }
          </div>
        </div>
      </div>
      <div className="lg:ml-[-10px] lg:mr-[15px] lg:my-[15px] lg:w-[70%] lg:h-[88%] lg:rounded-[25px] lg:flex-2 lg:flex-shrink-0 lg:border-solid lg:border-[#FFFFFF] lg:bg-[#FFFFFF]  lg:shadow-none lg:dark:border-[#272932] lg:dark:bg-[#272932]
      ml-[-10px] mr-[15px] my-[15px] w-[50%] h-[88%] rounded-[25px] flex-2 flex-shrink-0 border-solid border-[#FFFFFF] bg-[#FFFFFF]  shadow-none flex flex-row-3 dark:border-[#272932] dark:bg-[#272932]">
        <div className='w-full h-[10%] border-solid border-white'>
          { <ContactBar />}
        </div>
      </div>
    </div> 
  )
}




export default Chat;
