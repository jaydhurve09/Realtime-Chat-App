import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';

const ProfileSettings = ({ onClose }) => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [profilePic, setProfilePic] = useState(authUser?.profilePic || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ profilePic });
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
            <img 
              src={profilePic || authUser?.profilePic || '/default-avatar.png'} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <ImageUpload 
            selectedImage={profilePic} 
            setSelectedImage={setProfilePic} 
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-full" 
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;