import axios from "../../api/axiosConfig"
import { addChat, loadChats, loadConversation, setCurrentChat } from "../reducers/chatSlice"


export const getChatsAction = () => async (dispatchEvent) => {

    try {

        const res = await axios.get('/chat', { withCredentials: true })

        dispatchEvent(loadChats(res.data.chats))

    } catch (error) {
        console.log('faild to load chat \n', error.message)
    }
}
export const getConversationAction = (chatId,chatTitle) => async (dispatchEvent) => {

    try {

        const res = await axios.get(`/chat/conversation/${chatId}`, { withCredentials: true })

        dispatchEvent(loadConversation(res.data.conversation))
        dispatchEvent(setCurrentChat({chatId,chatTitle}))

    } catch (error) {
        console.log('faild to load chat \n', error.message)
    }
}
export const createChatAction = (chatTitle) => async (dispatchEvent) =>{
    try {
        const chat = await axios.post('/chat/add',{title:chatTitle},{withCredentials:true})

        dispatchEvent(addChat(chat.data))
        
    } catch (error) {
        console.log('error while creating chat in chat action',error)
    }
}



