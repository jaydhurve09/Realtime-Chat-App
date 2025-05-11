import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import ImageUpload from './ImageUpload';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const { sendMessage } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !image) || isSending) return;
    
    setIsSending(true);
    try {
      await sendMessage({ text: message, image });
      setMessage('');
      setImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border-t">
      {image && (
        <div className="mb-2 px-2">
          <ImageUpload 
            selectedImage={image} 
            setSelectedImage={setImage} 
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        {!image && (
          <ImageUpload 
            selectedImage={image} 
            setSelectedImage={setImage} 
            onImageSelect={setImage}
          />
        )}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button 
          type="submit" 
          className="btn btn-primary btn-circle"
          disabled={(!message.trim() && !image) || isSending}
        >
          {isSending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;