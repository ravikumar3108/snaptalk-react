import React, { useEffect } from 'react'
import { useSocketContext } from '../validation/socketContext'
import useConversation from '../Zustand/useConversation'
import notificationSound from "./Sound/frontend_src_assets_sounds_notification.mp3"

const useListenMessages = () => {

    const {socket} = useSocketContext()
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            const sound = new Audio(notificationSound)
            sound.play();
            setMessages([...messages,newMessage])
        })
        return ()=> socket?.off("newMessage");
    },[socket,messages,setMessages])   
}

export default useListenMessages
