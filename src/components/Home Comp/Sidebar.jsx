import React from 'react'
import SearchInput from './SearchInput'
import ConversationList from './ConversationList'
import MyProfile from './MyProfile'
import StatusList from '../User/StatusList'

function Sidebar() {
  return (
    /* Desktop par width fix rakhenge (common WhatsApp width 30% or 400px), 
       aur mobile par ise full width handle karenge parent component mein.
    */
    <div className='flex flex-col h-full w-full md:w-[400px] bg-[#111b21] border-r border-[#222e35] overflow-hidden'>

      {/* 1. Header: Profile and Actions Area */}
      {/* <div className='bg-[#202c33] px-4 py-3 flex items-center justify-between'>
        <MyProfile />
        <div className='flex items-center gap-4 text-[#aebac1]'>
          <Logoutbtn />
        </div>
      </div> */}
      <div className="bg-[#202c33]">
        <MyProfile />
      </div>

      {/* 2. Search Section: Sticky below header */}
      <div className='p-2 bg-[#111b21] border-b border-[#222e35]'>
        <SearchInput />
      </div>

      {/* 3. Conversation List: Scrollable area */}
      <div className='flex-1 overflow-y-auto custom-scrollbar bg-[#111b21]'>
        <ConversationList />
      </div>

    </div>
  )
}

export default Sidebar