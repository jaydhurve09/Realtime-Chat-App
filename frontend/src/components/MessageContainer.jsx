import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import Message from './Message';
import MessageInput from './MessageInput';

const MessageContainer = () => {
  const { messages, selectedUser } = useChatStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Welcome to Live Link</h2>
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">{selectedUser.fullName}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default MessageContainer;