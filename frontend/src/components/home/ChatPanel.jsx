import "./ChatPanel.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { useEffect, useRef, useState } from "react";
import { addConversationMsgs, setBotTyping,} from "../../store/reducers/chatSlice";
import { nanoid } from "nanoid";
import { FaArrowDown, FaBars } from "react-icons/fa";
import { createChatAction } from "../../store/actions/chatAction";
import { ToggleSidebarVisibility } from "../../store/reducers/uiSlice";
import MessageList from "../helper/messageList";

const ChatPanel = () => {
  const { register, reset, handleSubmit, watch } = useForm();
  const { conversation, activeChat, botTyping } = useSelector(
    (state) => state.chat
  );
  const { sidebarVisibility } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const chatWrapperRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Watch input value
  const contentValue = watch("content", "");

  const sendMessage = ({ content }) => {
    const msg = {
      _id: nanoid(),
      role: "user",
      chatId: activeChat.chatId,
      content,
      createdAt: Date.now(),
    };

    dispatch(addConversationMsgs(msg));
    dispatch(setBotTyping(true)); // start loading animation

    socket.emit("user-msg", msg);
    reset();
  };

  useEffect(() => {
    socket.on("ai-res", (msg) => {
      const modelMsg = {
        _id: nanoid(),
        role: "model",
        content: msg,
        createdAt: Date.now(),
      };
      dispatch(setBotTyping(false));
      dispatch(addConversationMsgs(modelMsg));
    });

    return () => {
      socket.off("ai-res");
    };
  }, [dispatch]);

  // Auto-scroll to bottom when new message comes
  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [conversation, botTyping]);

  // Show "scroll to bottom" button
  const handleScroll = () => {
    if (!chatWrapperRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatWrapperRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowScrollBtn(!isAtBottom);
  };

  const scrollToBottom = () => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTo({
        top: chatWrapperRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const createNewChat = () => {
    const chatName = prompt("enter name for chat");
    dispatch(createChatAction(chatName));
  };

  const handleSidebar = () => {
    console.log("handle clicked");
    dispatch(ToggleSidebarVisibility());
  };

  return (
    <div className="chat-panel">
      <div className={`titlebar ${sidebarVisibility ? "simple" : "options"}`}>
        {!sidebarVisibility && <FaBars onClick={handleSidebar} />}
        <span>{activeChat?.chatTitle ? activeChat.chatTitle : "title"}</span>
        {!sidebarVisibility && (
          <div className="newChatTitle" onClick={createNewChat}>
            <div>new chat</div>
          </div>
        )}
      </div>

      <div
        className="chat-wrapers"
        ref={chatWrapperRef}
        onScroll={handleScroll}
      >
       <MessageList messages={conversation} />

        {botTyping && (
          <li className="bot-msg typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </li>
        )}
      </div>

      {showScrollBtn && (
        <button className="scroll-btn" onClick={scrollToBottom}>
          <FaArrowDown />
        </button>
      )}

      <form onSubmit={handleSubmit(sendMessage)} className="input-bar">
        <input
          {...register("content")}
          required
          type="text"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={!contentValue.trim() || botTyping}
          style={{
            opacity: !contentValue.trim() || botTyping ? 0.5 : 1,
            cursor: !contentValue.trim() || botTyping ? "not-allowed" : "pointer",
          }}
        >
          send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
