import React from 'react'
import {
    Link
} from 'react-router-dom';

export default function Error() {
  return (
    <div className='flex justify-center items-center bg-gray-200 h-screen w-full'>
        <div className='w-1/3 h-4/6 rounded-md p-5 bg-gray-200 flex flex-col gap-5 drop-shadow-xl'>
            <div className='font-thin text-8xl w-full text-center'>page not found</div>
            <div className='font-thin text-lg'>if you are an admin of this site kindly click the button below to login</div>
            <div className='w-full flex justify-end items-center'>
                <Link to='/admin'>
                    <div className='transition duration-300 hover:bg-blue-500 cursor-pointer bg-blue-400 w-32 h-12 rounded-md text-lg text-gray-200 font-thin px-2 flex justify-end items-center'>
                        login
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}
