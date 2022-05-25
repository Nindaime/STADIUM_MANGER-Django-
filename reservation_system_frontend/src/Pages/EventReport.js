import {React, useEffect, useState} from 'react'
import Menu from './Admin/Components/Menu'
import moment from 'moment'
import $ from 'jquery'
import axios from 'axios'

export default function EventReport() {
    const [Data, setData] = useState([]);
    const [searchData, setsearchData] = useState([]);
    const [cData, setcData] = useState([]);
    const [PData, setPData] = useState([]);
    const [ID, setID] = useState("");
    const [WS, setWS] = useState("");
    const [form_dat, setform_dat] = useState("");



    function handleSearch(e){
        // setData(false)
        var pst = []
        if(e.target.value != ""){
            searchData.forEach(eac => {
                if(eac.teamA.toLowerCase().includes(e.target.value.toLowerCase()) || eac.teamB.toLowerCase().includes(e.target.value.toLowerCase()) || eac.location.toLowerCase().includes(e.target.value.toLowerCase())){
                    pst.push(eac)
                }

                if(pst.length > 0){
                    setsearchData(pst)
                }else{
                    setsearchData([])
                }
            });
        }else{
            setsearchData(Data)
        }
    }


    const firstActivity = ()=>{
        
        const chatSocket = new WebSocket(
            'ws://'
            + "127.0.0.1:8000"
            + '/ws/event'
        );
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            // console.log()

            
            setData(data.message);
            setsearchData(data.message);

        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        
        // setWS(chatSocket)


    }

    const secondActivity = (e)=>{
        
        const chatSocket = new WebSocket(
            'ws://'
            + "127.0.0.1:8000"
            + '/ws/report/'
            + e
            +"/"
        );
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);

            setPData(data.message)
            console.log(data.message)
            
            // set(data.message2);
            // setsearchData(data.message2);

        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        
        // setWS(chatSocket)


    }


    const handleEdit = (e)=>{
        secondActivity(e.target.id)

        Data.forEach(element => {
            if(element.id == e.target.id){
                setcData(element)
            }
        });

        $(".sldd").animate({
            width: '1020px'
        }, 500);


    }

    const handleEditC = ()=>{
        $(".sldd").animate({
            width: '0px'
        }, 500);

        setcData([])
    }
    

    useEffect(() => {
        firstActivity()
      }, []);


  return (
    <div className='bg-gray-200 w-full h-screen  flex justify-center items-start'>
        <div className='w-3/12 h-full '>
            <Menu page='report'/>
        </div>

        <div className='w-9/12 flex h-full flex-col overflow-y-scroll relative'>
            {/* <div className='w-full h-full bg-red-200 overflow-y-scroll'> */}
            <div className='text-md w-20 text-gray-50 font-thin top-6 right-10 bg-green-500 rounded-full p-1 flex justify-center items-center fixed z-20'>
                report
            </div>

            <div className='sticky z-10 bg-gray-200 opacity-100 bg-opacity-100 top-0'>
                <div className='flex gap-4 px-20 w-full bg-opacity-100 bg-gray-200 pt-10 h-40 justify-center items-center'>
                    <input onChange={handleSearch} type='text' placeholder='search by "team name" or "location"' className='h-10 w-full p-6 rounded-md outline-none border-none' />

                </div>
            </div>
            
            
            <div className='w-0 sldd h-full right-0 fixed top-0 z-10'>
                <div className='w-full h-full bg-gray-200 overflow-y-scroll pb-20'>
                    <div className='px-10 fixed pb-10 w-full justify-between items-center flex pt-20'>
                        <div onClick={handleEditC} className='cursor-pointer'>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </div>

                    </div>

                    <div className='flex mt-32 flex-col w-full px-32 gap-8'>
                        {PData.map((dd) => {
                            return(
                                <div className='w-full h-20 shadow-md drop-shadow-md flex px-10 rounded-md gap-10'>
                                    <div className='w-1/3 text-md font-thin flex flex-col justify-center items-center'>seat number 
                                        <div className='text-lg p-2 bg-gray-300 w-10 h-10 flex justify-center items-center rounded-md '>{dd.seatNumber}</div>
                                    </div>
                                    <div className='w-1/3 font-thin text-md flex flex-col justify-center items-center'>sold to: 
                                        <div className='text-lg'>{dd.customer}</div>
                                    </div>
                                    <div className='w-1/3 text-md font-thin flex flex-col justify-center items-center'>price:
                                        <div className='text-lg'>{dd.cost}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            

            <div className="flax flex-col px-6 pt-10 pb-6">
                {searchData.map((milestone) => {
                            return (
                                <div
                                
                                style={{  
                                    backgroundImage: "url(http://127.0.0.1:8000" + milestone.thumbnail + ")",
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    // opacity: '50'
                                }}
                                className='overflow-hidden h-20 rounded-md mb-8 shadow-gray-300 drop-shadow-md'>
                                    <div className='h-full text-gray-50 flex w-full gap-2 bg-black bg-opacity-70 px-5 justify-center py-1 items-center '>

                                        <div className='text-xl font-thin w-5/12 pl-10 h-full flex justify-start items-center'>
                                            {milestone.teamA} vs {milestone.teamB}
                                        </div>
                                        <div className='text-lg font-thin w-2/12 pl-10 h-full flex flex-col justify-center items-center'>
                                            <div>empty seats</div>
                                            {milestone.remainingSeat}
                                        </div>
                                        <div className='text-lg font-thin w-2/12 pl-10 h-full flex flex-col justify-center items-center'>
                                            <div>capacity</div>
                                            {milestone.seatNumber}
                                        </div>
                                        <div className='text-lg font-thin w-2/12 pl-10 h-full flex flex-col justify-center items-center'>
                                            <div>spectators</div>
                                            {milestone.seatNumber - milestone.remainingSeat}
                                        </div>
                                        <div id={milestone.id} onClick={handleEdit} className='text-lg font-thin w-1/12 cursor-pointer h-5/6 rounded-md bg-gray-400 flex justify-center items-center'>
                                            view
                                        </div>

                                    </div>


                                </div>
                            )
                        })
                    }
            </div>
            
            {/* </div> */}
        </div>
    </div>
  )
}
