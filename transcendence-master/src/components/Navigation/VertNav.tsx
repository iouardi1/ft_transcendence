import { useState } from 'react'
import Icon from './Icon';
import { NavLink } from 'react-router-dom';

export default function VertNav(props: any) {
    const [num, setNum] = useState(0);
    return (
        <div className={`dark:bg-[#272932] dark:text-white bg-slate-50 w-[100px] h-full  max-w-[100px] ${props.open ? "" : "hidden"} md:inline-block`}>
            <div className='h-full'>
                <ul className='flex flex-col h-full items-stretch'>
                    <div className='flex flex-col h-[50%] items-center justify-evenly'>
                        <li className={`${num === 0 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""}`}>
                            <span className={`${num === 0 ? " w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            <NavLink to="/" onClick={() => setNum(0)}>
                                <Icon name="home" color={`${num === 0 ? "#6F37CF" : "#8F8F8F"}`} />
                            </NavLink>
                            <span className={`${num === 0 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                        </li>
                        <li className={`${num === 1 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""} `}>
                            <span className={`${num === 1 ? "w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            <NavLink to="/play" onClick={() => setNum(1)}>
                                <Icon name="play" color={`${num === 1 ? "#6F37CF" : "#8F8F8F"}`} />
                            </NavLink>
                            <span className={`${num === 1 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                        </li>
                        <li className={`${num === 2 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""} `}>
                            <span className={`${num === 2 ? "w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            <NavLink to="/chat" onClick={() => setNum(2)} >
                                <Icon name="chat" color={`${num === 2 ? "#6F37CF" : "#8F8F8F"}`} />
                            </NavLink>
                            <span className={`${num === 2 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                        </li>
                        <li className={`${num === 3 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""} `}>
                            <span className={`${num === 3 ? "w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            <NavLink to="/stats" onClick={() => setNum(3)}>
                                <Icon name="stats" color={`${num === 3 ? "#6F37CF" : "#8F8F8F"}`} />
                            </NavLink>
                            <span className={`${num === 3 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                        </li>
                    </div>
                    <div className='flex flex-col h-[40%] justify-end items-center '>
                        <div className='flex flex-col justify-around items-center h-[70%] w-full'>
                            <span className='h-[2px] w-[50%] bg-[#8F8F8F] opacity-50 items-center rounded'></span>
                            <li className={`${num === 4 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""} `}>
                                <span className={`${num === 4 ? "w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                                <NavLink to="/settings" onClick={() => setNum(4)}>
                                    <Icon name="settings" color={`${num === 4 ? "#6F37CF" : "#8F8F8F"}`} />
                                </NavLink>
                                <span className={`${num === 4 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            </li>
                            <li className={`${num === 5 ? "ml-[30px] w-[90px] h-[90px] bg-[#EEF] dark:bg-[#1A1C26] rounded-l-[40px] flex items-center justify-center" : ""} `}>
                                <span className={`${num === 5 ? "w-[40px] h-[20px] bg-transparent relative left-[53px] top-[-55px] rounded-br-[20px] shadow-[7px_5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                                <NavLink to="/logout" onClick={() => setNum(5)}>
                                    <Icon name="logout" color={`${num === 5 ? "#6F37CF" : "#8F8F8F"}`} />
                                </NavLink>
                                <span className={`${num === 5 ? "w-[40px] h-[20px] bg-transparent relative left-[-10px] top-[55px] rounded-tr-[20px] shadow-[7px_-5px_0px_0px] shadow-[#EEF] dark:shadow-[#1A1C26]" : ""}`}></span>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}