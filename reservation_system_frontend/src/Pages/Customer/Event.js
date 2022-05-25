import {React, useState, useEffect} from 'react'
import axios from 'axios'
import NavBack from './Components/NavBack';
import moment from 'moment'
import $ from 'jquery'
import {useSelector} from 'react-redux'

export default function Event(props) {
    const customer = useSelector(state => state.customer)
    const [Data, setData] = useState([]);
    const [seatSold, setseatSold] = useState([]);
    const [Option, setOption] = useState("avail");
    const [ID, setID] = useState([]);
    const [ramdom, setramdom] = useState([]);
    const [SeatID, setSeatID] = useState("");
    const [WS, setWS] = useState("");
    const [Errors, setErrors] = useState([]);


    const firstActivity = ()=>{
        var id = document.location.href.split('/')[document.location.href.split('/').length - 1]

        if(id.includes("#")){
            id = id.split("#")[0]
        }

        setID(id)
        
        const chatSocket = new WebSocket(
            'ws://'
            + "127.0.0.1:8000"
            + '/ws/evnt/'
            + id
            +"/"
        );
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            
            console.log(data.seatSold)
            setData(data.message)
            setseatSold(data.seatSold)

            setramdom([...Array(data.message.seatNumber).keys()])

        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        
        setWS(chatSocket)


    }


    const handlePaymentShow = (e)=>{
        setSeatID(e.target.id)

        $('.option').fadeIn('slow')

    }

    const handlePay = ()=>{

        if(customer.userID !== null){
            let form_data = new FormData();
            form_data.append('cost', 400);
            form_data.append('seatNumber', SeatID);
            form_data.append('customer_id', customer.userID);
            form_data.append('event_id', ID);

            axios.post('http://127.0.0.1:8000/eventAPI/pay/', form_data, {
                headers: {
                    'Content-Type': "multipart/form-data;"
                }
            })
            .then((res) => {
                setErrors([])
                if(res.data.query == true){
                    firstActivity()

                    $(".succ").slideDown('fast')
                    
                    setTimeout(function (){
                        $('.option').fadeOut('slow')
                        setSeatID("")
                    }, 900);
                    setTimeout(function (){
                        $(".succ").fadeOut('slow')
                                
                    }, 2000);
                }else{
                    setErrors(res.data.query)
                    $(".err").fadeIn('slow');
                }
        
            }).catch(err => {
                console.log(err)
            });
         }else{
            $(".err1").fadeIn('slow');
         }
    }

    const handlePaymentHide = ()=>{
        $('.option').fadeOut('fast')
        setSeatID("")

    }

    useEffect(() => {
        setErrors([])
        firstActivity()
        // secondActivity()
    }, []);


    const handleOut = ()=>{
        $(".err1").fadeOut('fast')
    }

    const handleOutt = ()=>{
        $(".err").fadeOut('fast')
    }

    const handleOption = (e)=>{
        setOption(e.target.value)
        // console.log(e.target.value)
    }

  return (
    <div className='bg-gray-200 w-full min-h-screen'>
        <NavBack />
        <div className='err hidden text-md w-96 text-gray-50 font-thin z-20 top-2 right-2 h-fit bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start fixed'>
            <svg onClick={handleOutt}  className="w-6 h-6 mb-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            <div className='w-full h-full flex justify-center items-start flex-col gap-4'>
                {Errors.map(element => (
                    <div className='text-gray-50 text-lg font-thin flex gap-4 items-center w-auto'>
                        <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

                        {element}
                    </div>
                ))}
            </div>
        </div>

        <div className='err1 z-20 text-md hidden w-96 text-gray-50 font-thin top-2 right-2 h-32 bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start fixed'>
            <svg onClick={handleOut} class="w-6 h-6 mb-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            
            <div className='w-full flex justify-center items-center'>
                <div className='text-gray-50 font-thin text-lg flex gap-4 items-center w-auto'>
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

                    you will have to be logged in first
                </div>
            </div>
        </div>

        <div className='succ z-20 hidden flex justify-center fixed w-full items-center top-2 '>
            <div className='w-full h-full flex justify-center items-center'>
                <div className=' text-lg w-32 text-gray-50 font-thin bg-green-500 rounded-md p-4 flex justify-center items-center '>
                    <div className='w-full h-full flex gap-4  justify-center items-center'>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        success
                    </div>
                </div>
            </div>
        </div>

        <div className='px-24 flex h-96 w-full'>
            <div className='bg-black overflow-hidden h-full w-4/6 rounded-lg'>
                <div
                style={{  
                    backgroundImage: "url(http://127.0.0.1:8000" + Data.thumbnail + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }} className={"hover:shadow-lg opacity-40 transition duration-300 flex flex-col text-stone-200 justify-end  h-full"}>
                </div>
            </div>

            <div className='flex justify-center gap-6 items-start flex-col w-2/6 px-10'>
                <div className='flex gap-6 font-thin text-lg'>
                    <div className='font-medium'>match title: </div>
                    <div>{Data.teamA} vs {Data.teamB}</div>
                </div>
                <div className='flex gap-6 font-thin text-lg'>
                    <div className='font-medium'>location: </div>
                    <div>{Data.location}</div>
                </div>
                <div className='flex gap-6 font-thin text-lg'>
                    <div className='font-medium'>time: </div>
                    <div>{moment(Date.time).format('MM/DD/YYYY ')} by {moment(Date.time).format('h:mm a')}</div>
                </div>
                <div className='flex gap-6 font-thin text-lg'>
                    <div className='font-medium'>number of seats: </div>
                    <div>{Data.seatNumber}</div>
                </div>
                <div className='flex gap-6 font-thin text-lg'>
                    <div className='font-medium'>seats left: </div>
                    <div>{Data.remainingSeat}</div>
                </div>
                <a href="#book">
                <div className='flex justify-start items-center gap-4 text-gray-50 cursor-pointer bg-gray-400 h-10 rounded-md w-28 pl-2 font-thin text-lg'>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                    book
                </div></a>
            </div>

        </div>

        <div id='book' className='px-10'>
            <div className='w-full mt-14 mb-14 flex justify-end items-center sticky top-0 pt-5'>
                <select onChange={handleOption} className='w-2/12 p-3 bg-gray-200 drop-shadow-md text-lg font-thin outline-none border-0 rounded-md'>
                    <option value="avail" className='font-thin text-lg'>available</option>
                    <option value="sold" className='font-thin text-lg'>sold</option>
                    <option value="all" className='font-thin text-lg'>all</option>
                </select>
            </div>
            <div class="pt-16 justify-between w-full overflow-hidden items-center grid grid-cols-5 gap-5 src">
                {Option == 'all' ?
                    // {
                        ramdom.map(element => {
                            return (
                                <div key={element}  className={" overflow-hidden flex justify-center items-center w-full p-10 rounded-md"}>
                                    <div onClick={seatSold.includes(element+1)? "": handlePaymentShow} id={element + 1} 
                                    className={seatSold.includes(element+1)? 
                                    "shadow-sm shadow-gray-500 overflow-hidden bg-gray-400 transition duration-500 flex justify-center items-center text-gray-200 flex-col text-lg cursor-pointer font-thin w-full p-10 h-32 rounded-md" 
                                    :
                                    "shadow-sm shadow-gray-500 overflow-hidden bg-z-400 transition duration-500 flex justify-center items-center text-gray-900 text-lg cursor-pointer hover:bg-gray-300 font-thin w-full p-10 h-32 rounded-md"}>
                                        Seat {element + 1}
                                        {seatSold.includes(element+1)?
                                            <div className='w-full flex justify-center items-center text-sm font-thin italic'>sold</div>:""
                                        }
                                    </div>
                                </div>

                            )
                        })
                    // }
                :
                    Option == 'avail' ?
                    // {
                        ramdom.map(element => {
                            return (
                                seatSold.includes(element+1) ? 
                                    ""
                                :
                                <div key={element}  className={" overflow-hidden flex justify-center items-center w-full p-10 rounded-md"}>
                                    <div onClick={handlePaymentShow} id={element + 1} 
                                    className="shadow-sm shadow-gray-500 overflow-hidden bg-z-400 transition duration-500 flex justify-center items-center text-gray-900 text-lg cursor-pointer hover:bg-gray-300 font-thin w-full p-10 h-32 rounded-md">
                                        Seat {element + 1}
                                    </div>
                                </div>

                            )
                        })
                    // }
                    :
                        ramdom.map(element => {
                            return (
                                seatSold.includes(element+1) ? 
                                    <div key={element}  className={" overflow-hidden flex justify-center items-center w-full p-10 rounded-md"}>
                                        <div id={element + 1} className="shadow-sm shadow-gray-500 overflow-hidden bg-gray-400 transition duration-500 flex justify-center items-center text-gray-200 flex-col text-lg cursor-pointer font-thin w-full p-10 h-32 rounded-md">
                                        Seat {element + 1}
                                        <div className='w-full flex justify-center items-center text-sm font-thin italic'>sold</div>
                                    </div>
                                    </div>
                                :
                                    ""
                            )
                        })
                }
            </div>
        </div>

        <div className='option hidden text-md w-screen text-gray-50 h-screen font-thin backdrop-blur-sm top-0 right-0 bg-opacity-70 bg-black p-1 flex justify-center items-center fixed'>
            <div className='w-full h-full bg-opacity-0 flex justify-center items-center'>
                <div className='w-96 z-10 fixed shadow-xl shadow-slate-900 bg-gray-200 rounded-md p-5 h-80 text-gray-900'>
                    <div className='text-3xl font-thin mb-5 flex justify-center items-center gap-4'>
                        <svg class="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        you have decided to book seat {SeatID}
                    </div>
                    <div className='text-xl font-thin mb-10 bg-black w-fit px-2 py-1 text-gray-200'>are you sure ?</div>
                    <div className='flex justify-between items-center'>
                        <div onClick={handlePay} className='text-lg bg-green-500 justify-start items-center text-gray-50 font-thin w-28 h-10 px-2 cursor-pointer rounded-md flex gap-4'>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            pay
                        </div>
                        <div onClick={handlePaymentHide} className='text-lg bg-red-600 justify-end items-center text-gray-50 px-2 cursor-pointer font-thin w-28 h-10 rounded-md flex gap-4'>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
