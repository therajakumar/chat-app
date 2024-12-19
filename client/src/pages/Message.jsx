import { useParams } from "react-router-dom";
import Chatbox from "@/components/Chatbox";
import SideBar from "@/components/SideBar";

const Message = () => {
  const { chatId } = useParams();

  return (
    <div className="flex">
      <div className="w-[300px]">
        <SideBar />
      </div>
      <div className="flex-1"><Chatbox chatId={chatId} /></div>
    </div>
  );
};

export default Message;
