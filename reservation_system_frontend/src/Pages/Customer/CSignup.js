import { React, useState } from 'react'

import {
    Link
} from 'react-router-dom';
import $ from 'jquery'
import axios from 'axios'
import NavBack from './Components/NavBack';

export default function CSignup() {
    const [Errors, setErrors] = useState([]);

    const isBetween = (length, min, max) => length < min || length > max ? false : true;

    const handleSubmit = ()=>{
        
        setErrors([])

        var err = []
        if(!isBetween(document.querySelector(".uname").value.length, 1, 25)) {
            err.push('username must be between 1 and 25 characters.')
        }
        if(document.querySelector(".fname").value.length == 0) {
            err.push('firstname should not be empty.')
        }
        if(document.querySelector(".lname").value.length == 0) {
            err.push('lastname should not be empty.')
        }
        if(document.querySelector(".ps1").value.length == 0) {
            err.push('first password field is empty.')
        }
        if(document.querySelector(".ps2").value.length == 0) {
            err.push('second password field is empty.')
        }
        if(document.querySelector(".ps2").value.length != document.querySelector(".ps1").value.length) {
            err.push('passwords must match.')
        }

        setErrors(err)

        if(err.length > 0){
            $(".err").fadeIn('slow');
        }else{
        
            let form_data = new FormData();
            form_data.append('username', document.querySelector(".uname").value);
            form_data.append('firstname', document.querySelector(".fname").value);
            form_data.append('lastname', document.querySelector(".lname").value);
            form_data.append('password', document.querySelector(".ps2").value);

            axios.post('http://127.0.0.1:8000/eventAPI/custoner/', form_data, {
                headers: {
                    'Content-Type': "multipart/form-data;"
                }
            })
            .then((res) => {
                $(".succ").slideDown('fast')

                document.querySelector(".uname").value = ""
                document.querySelector(".fname").value = ""
                document.querySelector(".lname").value = ""
                document.querySelector(".ps1").value = ""
                document.querySelector(".ps2").value = ""
                
                setTimeout(function (){
                    $(".succ").fadeOut('slow')
                            
                }, 1500);
        
            }).catch(err => {
                console.log(err)
            });
        }



    }
    
    const handleOut = ()=>{
        $(".err").fadeOut('fast')
    }
  return (
    <div>
        <div className='bg-gray-200 w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full'>
                <NavBack />
            </div>
            <div className='text-3xl'>
                signup
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
            
            <div onClick={handleOut} className='err text-md hidden  w-2/5 text-gray-50 font-thin top-2 left-2/4 h-96 bg-red-500 bg-opacity-50 rounded-md p-4 flex flex-col justify-start absolute'>
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
            <div className='flex flex-col gap-6 w-2/5 p-20 items-end'>
                <input type="text"  placeholder='username' className='uname h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
                
                <div className='w-full flex gap-4'>
                    <input type="text"  placeholder='firstname' className='fname h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
                    <input type="text"  placeholder='lastname' className='lname h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
                </div>

                <div className='w-full flex gap-4'>
                    <input type="password"  placeholder='password' className='ps1 h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
                    <input type="password"  placeholder='connfirm password' className='ps2 h-14 transition-all border-b-2 duration-300 focus:border-blue-400 w-full rounded-md p-4 outline-none text-gray-900' />
                </div>

                <div onClick={handleSubmit} className='p-3 bg-gray-400 rounded-md text-lg font-semibold w-1/2 flex justify-end text-gray-200 cursor-pointer hover:bg-gray-500 transition-all duration-300'>
                    signup
                </div>
                
                <div className='text-blue-600'>
                    <Link to='/login'>login</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
