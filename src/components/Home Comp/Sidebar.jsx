import React from 'react'
import SearchInput from './SearchInput'
import ConversationList from './ConversationList'
import Logoutbtn from './Logoutbtn'
import MyProfile from './MyProfile'
import { FaBars } from "react-icons/fa6";



function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 h-full flex flex-col bg-dark3 text-white w-full'>
      {/* <FaBars className='text-2xl ml-3'/> */}
      <MyProfile/>
      <SearchInput/>
      {/* <div className="divider px-3 text-white"></div>  */}
      <ConversationList/>
    </div>
  )
}

export default Sidebar
