import React from 'react'
import UserOne from './components/UserOne'
import UserSecond from './components/UserSecond'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

function MainChatPage() {
    return (
        <div className=' text-center h-[100%]'>
            <h1 className=' text-[40px] font-semibold flex items-center gap-x-2 justify-center'>
                <IoChatbubbleEllipsesSharp />
                Group Chats
            </h1>
            <div className='flex items-center mt-6 justify-center '>
                <div className='flex space-x-8 items-center justify-center'>
                    <UserOne />
                    <UserSecond />
                </div>
            </div>
        </div>
    )
}

export default MainChatPage;