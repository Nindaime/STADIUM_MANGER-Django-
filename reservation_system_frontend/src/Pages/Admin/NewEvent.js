import { React, useState, useEffect } from 'react'
import Menu from './Components/Menu'
import $ from 'jquery'
import axios from 'axios'

export default function NewEvent() {

    const [Errors, setErrors] = useState([]);
    const [WS, setWS] = useState("");

    const firstActivity = ()=>{
        const chatSocket = new WebSocket(
            'ws://'
            // + window.location.
            + "127.0.0.1:8000"
            + '/ws/event'
        );
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        setWS(chatSocket)
    }

    useEffect(() => {
        firstActivity()
    }, []);

    function openSocket(){
        var webSocket = new WebSocket(
            'ws://'
            // + window.location.
            + "127.0.0.1:8000"
            + '/ws/event'
        );

        eventHandler(webSocket)
        return webSocket
    }

    async function sendData(chatSocket){
        $(".err").fadeOut('slow');
        
        let form_data = new FormData();
        form_data.append('teamA', document.querySelector(".nameA").value);
        form_data.append('teamB', document.querySelector(".nameB").value);

        form_data.append('teamAscore', 0);
        form_data.append('teamBscore', 0);

        form_data.append('time', document.querySelector(".date").value);
        form_data.append('seatNumber', document.querySelector(".seats").value);
        form_data.append('remainingSeat', document.querySelector(".seats").value);
        form_data.append('location', document.querySelector(".location").value);

        form_data.append('thumbnail', document.querySelector(".image").files[0]);

        form_data.append('teamAlogo', document.querySelector(".image1").files[0]);
        form_data.append('teamBlogo', document.querySelector(".image2").files[0]);

        // var data = {
        //     'name': document.querySelector(".name").value,
        //     'time': document.querySelector(".date").value,
        //     'seatNumber': document.querySelector(".seats").value,
        //     'remainingSeat': 0,
        //     'location': document.querySelector(".location").value,
        //     'thumbnail': document.querySelector(".image").files[0]
        // }

        // console.log(document.querySelector(".time").value)


        await axios.post('http://127.0.0.1:8000/eventAPI/eventPOST/', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then((res) => {
            // console.log(res)
            firstActivity()

            $(".succ").slideDown( 400, function() {
                
                document.querySelector(".nameA").value = ""
                document.querySelector(".nameB").value = ""

                document.querySelector(".date").value = ""
                document.querySelector(".seats").value = ""
                document.querySelector(".location").value = ""

                document.querySelector(".image").value = ""

                document.querySelector(".image1").value = ""
                document.querySelector(".image2").value = ""

                setTimeout(function (){
                    // Something you want delayed.
                    $(".succ").fadeOut('slow')
                              
                }, 1000);
                
            });
        }).catch(err => {
            console.log(err)
        });
        
        // eventHandler(chatSocket)
    }
    
    function eventHandler(chatSocket){
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    }


    const handleSubmit = (e)=>{
        setErrors([])

        var err = []

        if(document.querySelector(".nameA").value == ""){
           err.push("enter a value for team A name")
        }
        if(document.querySelector(".nameB").value == ""){
           err.push("enter a value for team B name")
        }
        if(document.querySelector(".date").value == ''){
            err.push("enter date of event")
        }
        if(parseInt(document.querySelector(".seats").value) <= 0 || document.querySelector(".seats").value == ''){
            err.push("number of seats should be more that zero")
        }
        if(document.querySelector(".location").value == ""){
            err.push("enter the location of the event")
        }
        if(document.querySelector(".image").value == ""){
            err.push("select an image thumbnail for the event")
        }
        if(document.querySelector(".image1").value == ""){
            err.push("select team A logo")
        }
        if(document.querySelector(".image2").value == ""){
            err.push("select team B logo")
        }

        setErrors(err)

        
        
        // var ws = openSocket();
        
        // enentHandler();
    
        // ws.onclose = function(e) {
        //     console.error('Chat socket closed unexpectedly');
        // };

        if(err.length > 0){
            $(".err").fadeIn('slow');
        }else{
            sendData(WS);
        }
    }

    const handleOut = ()=>{
        $(".err").fadeOut('fast')
    }


  return (
    <div className='bg-gray-200 w-screen h-screen flex justify-center items-center'>
        <div className='w-3/12 h-full'>
            <Menu page='create'/>
        </div>

        <div className='w-9/12 flex flex-col pt-20'>
            <div className='text-md w-20 text-gray-50 font-thin top-6 right-10 bg-green-500 rounded-full p-1 flex justify-center items-center absolute'>create</div>

            <div onClick={handleOut} className='err text-md hidden w-2/5 text-gray-50 font-thin top-2 left-2/4 h-96 bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start absolute'>
                <svg class="w-6 h-6 mb-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                
                <div>
                    {Errors.map(element => (
                        <div className='text-gray-50 font-semibold text-lg mt-3 flex gap-4 items-center w-auto'>
                            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

                            {element}
                        </div>
                    ))}
                </div>
            </div>

            <div onClick={handleOut} className='succ text-lg w-32 hidden text-gray-50 font-thin top-2 left-2/4 bg-green-500 bg-opacity-50 rounded-md p-4 flex justify-center items-center absolute'>
                <div className='w-full h-full flex gap-4  justify-center items-center'>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    success
                </div>
            </div>

            <div className='flex flex-col w-full px-20'>
                <div className='w-full flex items-center justify-between'>
                    <div className='flex flex-col gap-2'>
                        <div className=''>
                            <input className='image1' id='file1' name='file1' type='file' hidden/>
                            <label for='file1' className='cursor-pointer'>
                                <div className='gap-4 bg-gray-500 text-gray-200 h-10 w-40 flex justify-center items-center rounded-md'>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    team A logo
                                </div>
                            </label>
                        </div>
                        <input type='text' placeholder='team A name' className='nameA h-10 p-6 rounded-md outline-none border-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className=''>
                            <input className='image2' id='file2' name='file2' type='file' hidden/>
                            <label for='file2' className='cursor-pointer'>
                                <div className='gap-4 bg-gray-500 text-gray-200 h-10 w-40 flex justify-center items-center rounded-md'>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    team B logo
                                </div>
                            </label>
                        </div>
                        <input type='text' placeholder='team B name' className='nameB h-10 p-6 rounded-md outline-none border-none' />
                    </div>
                </div>

                <div className='font-thin mt-4 mb-2'>date and time:</div>
                <input type='datetime-local' className='date h-10 text-gray-500 p-6 rounded-md outline-none border-none mb-4' />

                <input type='number' min="1" placeholder='number of seats' className='seats h-10 p-6 rounded-md outline-none border-none mb-4' />

                <textarea className='location h-32 resize-none p-6 rounded-md outline-none border-none mb-4' placeholder='event location' />

                <div className='font-thin mb-2'>thumbnail:</div>
                <div className='w-full flex justify-between items-center'>
                    <label for='file' className='cursor-pointer'>
                        <div className='bg-green-500 text-gray-200 h-10 w-20 flex justify-center items-center rounded-md'>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    </label>

                    <div onClick={handleSubmit} className='bg-blue-400 h-10 w-32 flex justify-end items-center px-2 rounded-md text-lg text-gray-200 cursor-pointer hover:bg-blue-500 transition-all duration-300'>
                        create
                    </div>
                </div>

                <input className='image' id='file' name='file' type='file' hidden/>
            </div>
        </div>
    </div>
  )
}
