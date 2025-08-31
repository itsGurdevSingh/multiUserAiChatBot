import React, { useEffect } from "react";
import "./Sidebar.css";
import { FaPlus, FaTimes, FaComments } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebarVisibility } from "../../store/reducers/uiSlice";
import {
  createChatAction,
  getChatsAction,
  getConversationAction,
} from "../../store/actions/chatAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);

  const CreateChats = (chat) => {
    return (
      <li
        key={chat._id}
        className="chats"
        onClick={() => dispatch(getConversationAction(chat._id, chat.title))}
      >
        {chat.title}
      </li>
    );
  };

  useEffect(() => {
    dispatch(getChatsAction());
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      const initialChat = { chatId: chats[0]._id, chatTitle: chats[0].title };
      dispatch(
        getConversationAction(initialChat.chatId, initialChat.chatTitle)
      );
    }
  }, [chats, dispatch]);

  const createNewChat = () => {
    const chatName = prompt("enter name for chat");
    dispatch(createChatAction(chatName));
  };

  const handleSidebar = () => {
    console.log("handle clicked");
    dispatch(ToggleSidebarVisibility());
  };

  return (
    <div className="sidebar">
      <div className="heading">
        <FaComments />
        <FaTimes onClick={handleSidebar} />
      </div>

      <div className="newChat" onClick={createNewChat}>
        <FaPlus />
        <div>new chat</div>
      </div>

      <p className="chats-heading">chats</p>

      <ul className="chats-wraper">{chats.map((chat) => CreateChats(chat))}</ul>

    </div>
  );
};

export default Sidebar;
