import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  console.log("HomePage rendering, selectedUser:", selectedUser);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[90vh]">
        <div className="flex h-full rounded-lg overflow-hidden">
          <div className="w-1/4 min-w-[250px] max-w-[350px] h-full">
            <Sidebar />
          </div>
          <div className="flex-1 h-full">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;