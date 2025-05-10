import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  console.log("HomePage rendering, selectedUser:", selectedUser);

  return (
    <div className="min-h-screen bg-base-200"> {/* Changed from h-screen to min-h-screen */}
      <div className="flex items-center justify-center h-full py-4"> {/* Changed pt-20 to py-4 and added h-full */}
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[85vh]"> {/* Changed shadow-cl to shadow-xl and fixed height calculation */}
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;