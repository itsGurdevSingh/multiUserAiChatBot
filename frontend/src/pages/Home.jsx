import Sidebar from "../components/home/Sidebar";
import ChatPanel from "../components/home/ChatPanel";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
  const { sidebarVisibility } = useSelector((state) => state.ui);

  return (
    <div className="homePage">


      {/* Sidebar */}
      <div className={`sidebar-wraper ${sidebarVisibility ? "open" : "closed"}`}>
        <Sidebar />
      </div>

      {/* Chat Panel */}
      <div className="chat-panel-wraper">
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
