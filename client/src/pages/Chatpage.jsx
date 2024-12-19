import SideBar from "@/components/SideBar";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Chatpage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <div className="w-[300px]">
        <SideBar />
      </div>
      <div className="flex-1 h-screen w-full flex flex-col items-center justify-center">
        <p>Select a chat and start typing</p>
      </div>
      <Link
        to="/search"
        className="absolute bottom-10 right-10 bg-gray-500 rounded-full p-3"
      >
        <Search />
      </Link>
    </div>
  );
};

export default Chatpage;
