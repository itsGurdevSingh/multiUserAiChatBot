import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChat: {chatId:'',chatTitle:''},
    chats: [],
    conversation: [],
    botTyping: false

}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        loadChats: (state, actions) => {
            state.chats = actions.payload;
        },
        loadConversation: (state, actions) => {
            state.conversation = actions.payload;
        },
        addConversationMsgs: (state, actions) => {
            state.conversation.push(actions.payload)
        },
        setCurrentChat: (state, actions) => {
            state.activeChat = actions.payload;
        },
        addChat:(state,actions) =>{
            state.chats.unshift(actions.payload)
        },
        setBotTyping:(state, actions) => {
            state.botTyping = actions.payload; // server res loding indicator  . 
        }
    }
})

export default chatSlice.reducer;
export const { loadChats, addChat, setCurrentChat, loadConversation, addConversationMsgs,setBotTyping } = chatSlice.actions;