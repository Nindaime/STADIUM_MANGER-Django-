import React from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {clear_customer} from '../../actions'


import {
    Link
  } from 'react-router-dom';

export default function Header() {
    const customer = useSelector(state => state.customer)
    const dispatch = useDispatch()

    const logout = ()=>{
        dispatch(
            clear_customer()
          )
    }

  return (
    <div className='flex font-thin justify-between text-gray-900 items-center px-44 py-20 '>
        <div className='text-5xl cursor-pointer'><strike>reservoir</strike></div>

        <div className='text-xl cursor-pointer'>
            <a href='#event'><div>events</div></a>
        </div>
        
        {customer.loggedIn == false ?
            <div className='flex gap-4 text-xl'>
                <Link to="/login"><div className=' cursor-pointer'>login</div></Link>
                <Link to="/signup" ><div className=' cursor-pointer'>signup</div></Link>
            </div>

            :

            <div className='flex gap-4'>
                <div className=''><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
                <div className='text-lg font-thin'>{customer.username}</div>
                <div onClick={logout} className='cursor-pointer text-lg font-thin'>logout</div>
            </div>
        }
    </div>
  )
}
