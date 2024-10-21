import React, { useState } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateProfile = () => {
  const auth = getAuth();
  const storage = getStorage();
  const currentUser = auth.currentUser;

  // State for form fields
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to upload profile photo to Firebase Storage
  const uploadPhoto = async (file) => {
    try {
      const storageRef = ref(storage, `user_photos/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Function to handle profile updates
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      let updatedPhotoURL = currentUser.photoURL;

      // If a new profile photo is uploaded, update it in Firebase Storage
      if (file) {
        updatedPhotoURL = await uploadPhoto(file);
      }

      // Update the user profile with the new display name and photo URL
      await updateProfile(currentUser, {
        displayName: displayName,
        photoURL: updatedPhotoURL,
      });

      // Update the user's email
      if (email !== currentUser.email) {
        await updateEmail(currentUser, email);
      }

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="photo">Profile Picture:</label>
          <input type="file" id="photo" onChange={handleFileChange} />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
