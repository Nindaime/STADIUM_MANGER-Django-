import {React, useEffect, useState} from 'react'

import {
    Link
  } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { clear_sdmin } from '../../../actions';

export default function Menu(props) {

    const dispatch = useDispatch()

    useEffect(() => {

        var cls = "."+props.page;

        if(props.page !== ''){
            document.querySelector(cls).classList.add('bg-gray-400')
        }
        

    }, []);

    const handleLogout = ()=>{
        setTimeout(function (){ 
            dispatch(
                clear_sdmin()
            )
            window.location = "http://localhost:3000/admin"            
        }, 200);
    }
    
  return (
    <div className='flex flex-col h-full justify-start pt-10 w-full items-center'>
        <div className='text-2xl mb-10 font-thin'>bodunde david</div>
        <Link to='/admin/create-event' className='w-8/12'><div className='create w-full h-14 rounded-md flex justify-center items-center text-lg text-gray-200 bg-blue-400 mb-6 gap-4 transition-all duration-300 hover:bg-gray-400 cursor-pointer'>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            create events
        </div></Link>

        <Link to='/admin/update-event' className='w-8/12'><div className='update w-full h-14 rounded-md flex justify-center items-center text-lg text-gray-200 bg-blue-400 mb-6 gap-4 transition-all duration-300 hover:bg-gray-400 cursor-pointer'>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            update events
        </div></Link>

        <Link to='/admin/report-event' className='w-8/12'><div className='report w-full h-14 rounded-md flex justify-center items-center text-lg text-gray-200 bg-blue-400 mb-6 gap-4 transition-all duration-300 hover:bg-gray-400 cursor-pointer'>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            events report
        </div></Link>

        <div onClick={handleLogout} className='w-8/12 h-14 rounded-md flex justify-center items-center text-lg text-gray-200 bg-red-700 mb-6 gap-4 transition-all duration-300 hover:bg-red-600 cursor-pointer'>
            logout
        </div>
    </div>
  )
}
