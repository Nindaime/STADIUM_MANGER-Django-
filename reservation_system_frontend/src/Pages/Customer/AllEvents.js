import {React, useState, useEffect} from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function AllEvents() {
    const [Data, setData] = useState([]);
    const [sData, setsData] = useState([]);


    function handleSearch(e){
        // setData(false)
        console.log(e.target.value)
        var pst = []
        if(e.target.value != ""){
            sData.forEach(eac => {
                if(eac.teamA.toLowerCase().includes(e.target.value.toLowerCase()) || eac.teamB.toLowerCase().includes(e.target.value.toLowerCase()) || eac.location.toLowerCase().includes(e.target.value.toLowerCase())){
                    pst.push(eac)
                }

                if(pst.length > 0){
                    setsData(pst)
                }else{
                    setsData([])
                }
            });
        }else{
            setsData(Data)
        }
    }
 

  useEffect(() => {
    
    const chatSocket = new WebSocket(
        'ws://'
        + "127.0.0.1:8000"
        + '/ws/event'
    );

    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        
        setData(data.message);
        setsData(data.message);
    };

    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };
  }, []);
  return (
    <div className='bg-gray-200 w-full h-screen pt-36 max-h-screen overflow-y-scroll px-10'>

        <div className='w-full flex justify-center items-center fixed top-4 z-20 '>
        <div id='event' className='px-20 w-10/12 gap-10 rounded-md drop-shadow-lg bg-gray-200 h-28 flex justify-center items-center overflow-hidden'>
            
            <Link to="/"><div className='cursor-pointer'>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </div></Link>
            <div className='w-full flex border-2 border-gray-300 rounded-md h-14'>
                <input onChange={handleSearch} placeholder='search event by "team name" or "location" !' className='h-full bg-transparent px-10 outline-none w-full' />
                {/* <div className='bg-green-500 flex justify-center items-center m-1 w-14 rounded-md'>
                    <svg class="w-6 h-6 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div> */}
            </div>
        </div>
        </div>

        {sData.length > 0 ?
            <div class="px-10 justify-center w-full overflow-hidden items-center grid grid-cols-3 gap-5 src">
                    {sData.map((milestone) => {
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
            </div>
            :
            
            <div className='text-lg mt-10 font-thin w-full h-10 flex justify-center items-center'>
                no event(s) for now
            </div>
        }
        
    </div>
  )
}
