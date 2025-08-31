import React from "react";

// Utility to format date headers
const formatDateHeader = (date) => {
  const msgDate = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    msgDate.toDateString() === today.toDateString();
  const isYesterday =
    msgDate.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return msgDate.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

// Single message bubble
const Msg = ({ msg }) => {
  const { content, createdAt, role } = msg;
  return (
    <div className={role}>
      <div className="msg-content">{content}</div>
      <div className="msg-timestamp">
        {new Date(createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

// Main MessageList Component
const MessageList = ({ messages }) => {
  let lastDate = null;

  return (
    <div className="message-list">
      {messages.map((msg) => {
        const msgDateStr = new Date(msg.createdAt).toDateString();
        const showDateHeader = msgDateStr !== lastDate;
        lastDate = msgDateStr;

        return (
          <React.Fragment key={msg._id}>
            {showDateHeader && (
              <div className="date-separator">
                <span>{formatDateHeader(msg.createdAt)}</span>
              </div>
            )}
            <Msg msg={msg} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MessageList;
