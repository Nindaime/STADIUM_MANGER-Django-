import {React, useEffect, useState} from 'react'
import Header from './Header'
import three from './img/three.jpg'
import Crad from './Components/Crad';
import moment from 'moment'
import { Link } from 'react-router-dom';

export default function Home() {

    const [Data, setData] = useState([]);
    const [Show, setShow] = useState(true);
 

  useEffect(() => {
    
    const chatSocket = new WebSocket(
        'ws://'
        // + window.location.
        + "127.0.0.1:8000"
        + '/ws/event'
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        if(data.message.length > 8){
            setData(data.message.slice(0, 8));
            setShow(true)
        }else{
            setData(data.message.slice(0, data.message.length + 1));
            setShow(false)
        }
        // console.log(data.message);

        // document.querySelector(".src").innerHTML = data.message.map(item =>(
        //     `<Crad key=${item.id} />`
        // )).join('')
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
  }, []);

  return (
    <div className='bg-gray-200 min-h-screen w-full pb-20'>
        <Header />

        <div className='px-44 mt-20 overflow-hidden'>
            <div className='h-96 overflow-hidden rounded-2xl bg-black'>
                <div className='h-full flex flex-col justify-end items-start pb-16 pl-10 text-gray-50 bg-model_s bg-center bg-cover opacity-50'>
                    {/* <img src={three} className="w-full h-full" /> */}
                    <div className='text-4xl bg-black'>book your seats with our</div>
                    <div className='text-7xl bg-black'>- reservoir platform</div>
                </div>
            </div>
        </div>

        <div id='event' className='px-44 pt-10 w-full flex mt-20 mb-10 justify-center items-center overflow-hidden'>
            <div className='text-3xl font-thin'>latest matche(s)</div>
        </div>

        {Data.length > 0 ?
            <div class="px-10 pt-16 justify-center w-full overflow-hidden items-center grid grid-cols-3 gap-5 src">
                    {Data.map((milestone) => {
                        return (

                            <a href={"/event/"+milestone.id}><div className={" overflow-hidden bg-black transition duration-500 flex flex-col text-stone-200 justify-end w-full h-80 rounded-md mb-10"}>
                                <div
                                style={{  
                                    backgroundImage: "url(http://127.0.0.1:8000" + milestone.thumbnail + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    // opacity: '50'
                                }}
                                className={"hover:shadow-lg opacity-80 transition duration-300 flex flex-col text-stone-200 justify-end w-full h-full"}>
                                    <div className='w-full hover:opacity-0 transition-all duration-500 cursor-pointer h-full flex flex-col items-start justify-end px-4 pb-4 bg-black bg-opacity-60'>
                                        
                                        <div className="flex justify-around w-full h-full items-center mb-2 pt-20">
                                            <div className='flex flex-col h-full justify-center items-center'>
                                                <div
                                                className="w-full flex justify-center items-center mb-2 overflow-hidden"
                                                >
                                                    <img src={"http://127.0.0.1:8000" + milestone.teamAlogo} className="h-12 w-12" />
                                                </div>
                                                <div className='text-lg font-thin flex justify-center items-center text-gray-50 w-full'>{milestone.teamA}</div>
                                                <div className='w-full flex justify-center items-center'>
                                                <div className='bg-black h-8 w-8 text-lg font-thin flex justify-center items-center text-gray-50 rounded-md '>{milestone.teamAscore}</div>
                                                </div>
                                            </div>
                                            <div className='text-xl font-thin'>vs</div>
                                            <div className='flex flex-col h-full justify-center items-center'>
                                                <div
                                                className="w-full flex justify-center items-center mb-2 overflow-hidden"
                                                >
                                                    <img src={"http://127.0.0.1:8000" + milestone.teamBlogo} className="h-12 w-12" />
                                                </div>
                                                <div className='text-lg font-thin flex justify-center items-center text-gray-50 w-full'>{milestone.teamB}</div>
                                                <div className='w-full flex justify-center items-center'>
                                                <div className='bg-black h-8 w-8 text-lg font-thin flex justify-center items-center text-gray-50 rounded-md '>{milestone.teamBscore}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-lg font-thin"><b>time:</b> {moment(milestone.time).format('MM/DD/YYYY ')} by {moment(milestone.time).format('h:mm a')}</div>
                                        <div className="text-md font-thin mb-6"><b>seats remaining:</b> {milestone.remainingSeat}</div>
                                    </div>
                                </div>
                            </div></a>
                        )
                    })
                }

                {Show? 
                <Link to="/matches"><div className={"overflow-hidden bg-black transition duration-300 hover:bg-opacity-50 cursor-pointer bg-opacity-80 flex text-stone-200 w-full h-80 justify-center items-center rounded-md mb-10"}>
                    <div className="w-full gap-4 h-full flex justify-center items-center text-lg font-thin ">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        see more
                    </div>
                </div></Link>
                :
                ""
                }
            </div>
            :
            
            <div className='text-lg mt-10 font-thin w-full h-10 flex justify-center items-center'>
                no event(s) for now
            </div>
        }

        <div className='w-full h-20 flex justify-center items-center text-xl mt-10 font-thin'>
            &copy; copyright bodunde david
        </div>
                
    </div>
  )
}
