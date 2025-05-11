import { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUpload = ({ onImageSelect, selectedImage, setSelectedImage }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      if (onImageSelect) onImageSelect(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      {selectedImage ? (
        <div className="relative">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="w-full h-auto rounded-md object-cover max-h-60" 
          />
          <button 
            onClick={() => {
              setSelectedImage(null);
              if (onImageSelect) onImageSelect(null);
            }}
            className="absolute top-2 right-2 bg-gray-800/70 p-1 rounded-full"
          >
            <X className="size-4 text-white" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 text-primary hover:bg-primary/10 p-2 rounded-md transition-colors"
          type="button"
        >
          <Camera className="size-5" />
          <span>Add Image</span>
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;