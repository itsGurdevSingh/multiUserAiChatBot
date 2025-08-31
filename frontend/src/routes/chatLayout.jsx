import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import socket from "../socket";

const ChatLayout = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected:");
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  return <Outlet />;
};

export default ChatLayout;
