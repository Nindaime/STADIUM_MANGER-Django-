import axios from 'axios';
import React from 'react'
import {
    Link
} from 'react-router-dom';
import $ from 'jquery'
import {useDispatch} from 'react-redux'
import {add_customer} from '../../actions'
import NavBack from './Components/NavBack';

export default function CLogin() {
    const dispatch = useDispatch()

    const handleLogin = ()=>{

        let form_data = new FormData();
        form_data.append('username', document.querySelector(".user").value);
        form_data.append('password', document.querySelector(".pwrd").value);

        axios.post("http://127.0.0.1:8000/eventAPI/customer/", form_data,{
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then(res =>{
            var result = res.data.query
            console.log(res.data)
            // console.log(window)

            if(result == null){
                $(".err").fadeIn('slow');
            }else{
                dispatch(
                    add_customer(res.data)
                  )
                $(".succ").slideDown('fast')

                document.querySelector(".user").value = ""
                document.querySelector(".pwrd").value = ""
                
                setTimeout(function (){
                    $(".succ").fadeOut('slow')
                            
                }, 1500);

                setTimeout(function (){ 
                    window.location = "http://localhost:3000/"
                    // window.location.replace("http://localhost:3000/");                        
                }, 1000);




            }
        })
    }

    const handleOut = ()=>{
        $(".err").fadeOut('fast')
    }
  return (
    <div className='bg-gray-200 w-full h-full flex flex-col justify-center items-center'>
        <div className='w-full'>
            <NavBack />
        </div>
        <div className='text-3xl'>
            login
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

        <div className='err text-md hidden  w-96 text-gray-50 font-thin top-2 right-2 h-32 bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start absolute'>
            <svg onClick={handleOut} class="w-6 h-6 mb-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            
            <div className='w-full flex justify-center items-center'>
                <div className='text-gray-50 font-semibold text-lg mt-3 flex gap-4 items-center w-auto'>
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>

                    wrong login credentials
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-6 w-2/5 p-20 items-end'>
            <input type="text"  placeholder='username' className='user h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
            <input type="password"  placeholder='password' className='pwrd h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
            <div onClick={handleLogin} className='p-3 bg-gray-400 rounded-md text-lg font-semibold w-1/2 flex justify-end text-gray-200 cursor-pointer hover:bg-gray-500 transition-all duration-300'>
                login
            </div>
            <div className='text-blue-600'>
                <Link to='/signup'>open an account</Link>
            </div>
        </div>
    </div>
  )
}
