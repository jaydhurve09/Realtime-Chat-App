import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const { getUsers, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getUsers();
    }
    
    subscribeToMessages();
    
    return () => {
      unsubscribeFromMessages();
    };
  }, [getUsers, subscribeToMessages, unsubscribeFromMessages, authUser]);

  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16 overflow-hidden bg-base-100">
      <div className="container mx-auto flex h-full shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-[3] border-l border-base-300 flex flex-col">
            <MessageContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;