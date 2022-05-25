import {React, useEffect, useState} from 'react'
import Menu from './Components/Menu'
import moment from 'moment'
import $ from 'jquery'
import axios from 'axios'

export default function UpdateEvent() {



    


    const [Data, setData] = useState([]);
    const [searchData, setsearchData] = useState([]);
    const [cData, setcData] = useState([]);
    const [Errors, setErrors] = useState([]);
    const [WS, setWS] = useState("");
    const [form_dat, setform_dat] = useState("");


    const handleEdit = (e)=>{
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



    async function handleDelete(e){
        var url = 'http://127.0.0.1:8000/eventAPI/event/'+e.target.id+'/'

        await axios.delete(url)
        .then((res) => {
            firstActivity()

            // Data.forEach(element => {
            //     if(element.id == cData.id){
            //         setcData(element)
            //     }
            // });

            // $(".succ").slideDown( 400, function() {
                
            //     document.querySelector(".name").value = ""
            //     document.querySelector(".date").value = ""
            //     document.querySelector(".seats").value = ""
            //     document.querySelector(".location").value = ""
            //     document.querySelector(".image").value = ""

            //     setTimeout(function (){
            //         // Something you want delayed.
            //         $(".succ").fadeOut('slow')
                              
            //     }, 1000);
                
            // });
        }).catch(err => {
            console.log(err)
        });
        // }
    }




    async function handleSubmit(e){
        
        let form_data = new FormData();
        form_data.append('id', cData.id);
        // form_data.append('remainingSeat', 0);

        if(document.querySelector(".nameA").value !== ""){
            form_data.append('teamA', document.querySelector(".nameA").value);
        }
        if(document.querySelector(".nameB").value !== ""){
            form_data.append('teamB', document.querySelector(".nameB").value);
        }
        if(document.querySelector(".date").value !== ''){
            form_data.append('time', document.querySelector(".date").value);
        }
        if(parseInt(document.querySelector(".seats").value) > 0 || document.querySelector(".seats").value !== ''){
            form_data.append('seatNumber', document.querySelector(".seats").value);
        }
        if(document.querySelector(".location").value !== ""){
            form_data.append('location', document.querySelector(".location").value);
        }
        if(document.querySelector(".image").value !== ""){
            form_data.append('thumbnail', document.querySelector(".image").files[0]);
        }

        setform_dat(form_data)


        await axios.patch('http://127.0.0.1:8000/eventAPI/eventPOST/', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then((res) => {
            // console.log(res)
            firstActivity()

            setTimeout(function (){
            //     Data.forEach(element => {
            //         if(element.id == cData.id){
            //             setcData(element)
            //         }
            //     });
                handleEditC()
            }, 1000);

            $(".succ").slideDown( 400, function() {
                
                document.querySelector(".nameA").value = ""
                document.querySelector(".nameB").value = ""
                document.querySelector(".date").value = ""
                document.querySelector(".seats").value = ""
                document.querySelector(".location").value = ""
                document.querySelector(".image").value = ""

                setTimeout(function (){
                    // Something you want delayed.
                    $(".succ").fadeOut('slow')
                              
                }, 1000);
                
            });
        }).catch(err => {
            console.log(err)
        });
        // }
    }

    const handleOut = ()=>{
        $(".err").fadeOut('fast')
    }

    const firstActivity =()=>{
        const chatSocket = new WebSocket(
            'ws://'
            // + window.location.
            + "127.0.0.1:8000"
            + '/ws/event'
        );

        setWS(chatSocket)
    
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            
            setData(data.message);
            setsearchData(data.message)
        };
    
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };
    }
    

    useEffect(() => {
        firstActivity()
      }, []);


  return (
    <div className='bg-gray-200 w-full h-screen  flex justify-center items-start'>
        <div className='w-3/12 h-full '>
            <Menu page='update'/>
        </div>

        <div onClick={handleOut} className='err text-md hidden z-20 w-2/5 text-gray-50 font-thin top-2 left-2/4 h-96 bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start absolute'>
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

            <div onClick={handleOut} className='succ text-lg z-20 w-32 hidden text-gray-50 font-thin top-2 left-2/4 bg-green-500 bg-opacity-50 rounded-md p-4 flex justify-center items-center absolute'>
                <div className='w-full h-full flex gap-4  justify-center items-center'>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    success
                </div>
            </div>

        <div className='w-9/12 flex h-full flex-col overflow-y-scroll relative'>
            {/* <div className='w-full h-full bg-red-200 overflow-y-scroll'> */}
            <div className='text-md w-20 text-gray-50 font-thin top-6 right-10 bg-green-500 rounded-full p-1 flex justify-center items-center fixed z-20'>
                update
            </div>

            <div className='sticky z-10 bg-gray-200 opacity-100 bg-opacity-100 top-0'>
                <div className='flex gap-4 px-20 w-full bg-opacity-100 bg-gray-200 pt-10 h-40 justify-center items-center'>
                    <input onChange={handleSearch} type='text' placeholder='search by "team name" or "location"' className='h-10 w-full p-6 rounded-md outline-none border-none' />

                </div>
            </div>
            
            
            <div className='w-0 sldd h-full right-0 fixed top-0 z-10 overflow-hidden'>
                <div className='w-full h-full bg-gray-200 '>
                    <div className='px-10 pb-10 w-full justify-between items-center flex pt-20'>
                        <div onClick={handleEditC} className='cursor-pointer'>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        </div>

                    </div>

                    <div className='flex flex-col w-full px-10'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex flex-col gap-2'>
                                {/* <div className=''>
                                    <input className='image1' id='file1' name='file1' type='file' hidden/>
                                    <label for='file1' className='cursor-pointer'>
                                        <div className='gap-4 bg-gray-500 text-gray-200 h-10 w-40 flex justify-center items-center rounded-md'>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            team A logo
                                        </div>
                                    </label>
                                </div> */}
                                <input type='text' placeholder={cData.teamA} className='nameA h-10 p-6 rounded-md outline-none border-none' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                {/* <div className=''>
                                    <input className='image2' id='file2' name='file2' type='file' hidden/>
                                    <label for='file2' className='cursor-pointer'>
                                        <div className='gap-4 bg-gray-500 text-gray-200 h-10 w-40 flex justify-center items-center rounded-md'>
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            team B logo
                                        </div>
                                    </label>
                                </div> */}
                                <input type='text' placeholder={cData.teamB} className='nameB h-10 p-6 rounded-md outline-none border-none' />
                            </div>
                        </div>

                        <div className='font-thin mt-4 mb-2'>date and time:</div>
                        <input type='datetime-local' className='date h-10 text-gray-500 p-6 rounded-md outline-none border-none mb-4' />

                        <input type='number' min="1" placeholder={cData.seatNumber} className='seats h-10 p-6 rounded-md outline-none border-none mb-4' />

                        <textarea className='location h-32 resize-none p-6 rounded-md outline-none border-none mb-4' placeholder={cData.location} />

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
            

            <div className="grid grid-cols-2 gap-10 px-6 pt-10 pb-6 relative">
                {searchData.map((milestone) => {
                            return (

                                <div className={" overflow-hidden bg-black transition duration-500 flex flex-col text-stone-200 justify-end w-full h-80 rounded-md mb-10"}>
                                    <div
                                    style={{  
                                        backgroundImage: "url(http://127.0.0.1:8000" + milestone.thumbnail + ")",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        // opacity: '50'
                                    }}
                                    className={"hover:shadow-lg opacity-80 transition duration-300 flex flex-col text-stone-200 justify-end w-full h-full"}>
                                        <div className='w-full  transition-all duration-500 h-full flex flex-col items-start justify-end pl-4 pb-4 bg-black bg-opacity-60'>
                                            <div className="text-3xl text-gray-50 font-black">{milestone.teamA} vs {milestone.teamB}</div>
                                            <div className="text-lg font-thin bg-black">time: {moment(milestone.time).format('MM/DD/YYYY ')} by {moment(milestone.time).format('h:mm a')}</div>
                                            <div className="text-md font-thin bg-black">location: {milestone.location}</div>
                                            <div className='text-gray-900 gap-4 font-light w-full mt-10 w-full flex justify-center items-center'>
                                                <div onClick={handleEdit} id={milestone.id} className='cursor-pointer w-20 bg-yellow-200 h-8 rounded-md flex justify-center items-center'>edit</div>
                                                <div onClick={handleDelete} id={milestone.id} className='cursor-pointer w-20 bg-red-400 h-8 rounded-md flex justify-center items-center'>delete</div>
                                            </div>
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
