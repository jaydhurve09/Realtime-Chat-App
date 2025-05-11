import { useAuthStore } from '../store/useAuthStore';

const Message = ({ message }) => {
  const { authUser } = useAuthStore();
  const isMine = message.senderId === authUser._id;

  return (
    <div className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>
      <div className={`chat-bubble ${isMine ? 'bg-primary text-primary-content' : 'bg-base-300'}`}>
        {message.text}
        {message.image && (
          <div className="mt-2">
            <img 
              src={message.image} 
              alt="Message attachment" 
              className="rounded-md max-w-full max-h-60 object-contain"
            />
          </div>
        )}
      </div>
      <div className="chat-footer opacity-70 text-xs">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default Message;