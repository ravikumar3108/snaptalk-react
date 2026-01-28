import { useEffect } from 'react'; // React removed to fix build error
import { useSocketContext } from '../validation/socketContext';
import useConversation from '../Zustand/useConversation';
import notificationSound from "./Sound/frontend_src_assets_sounds_notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        // Listening for new messages via socket
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play().catch(err => console.log("Audio play error:", err));
            
            // Appending new message to the existing list
            setMessages([...messages, newMessage]);
        });

        // Cleanup listener on unmount
        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);   
};

export default useListenMessages;