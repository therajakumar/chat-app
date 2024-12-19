import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const backendurl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
    const token = Cookies.get("authtoken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${backendurl}/api/message/users`,
          config
        );

        setUser(data);
      } catch (error) {
        setUser([]);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <div>
        <Command className="h-screen border-gray-500 border-r-[1px]">
          <CommandInput
            className="h-18"
            placeholder="Type a command or search..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandSeparator />

            <CommandGroup heading="Chats">
              {users.length
                ? users?.map((user) => (
                    <Link to={"/chats/" + user?.users[0]?._id} key={user._id}>
                      <CommandItem className="cursor-pointer">
                        <div className="flex gap-4">
                          <img
                            className="rounded-full w-10 h-10"
                            src={user?.users[0]?.pic}
                            onError={(e) => {
                              e.target.src = "https://github.com/shadcn.png";
                            }}
                          />
                          <div className="flex flex-col justify-between">
                            <h1 className="font-bold">
                              {user?.users[0]?.name}
                            </h1>
                            <p className="text-xs">
                              {user?.latestMessage?.content}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    </Link>
                  ))
                : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default SideBar;
