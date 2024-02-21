import { createContext, useContext } from "react";
import { storage } from "../config/firebaseConfig";

const StorageContext = createContext();

export function useStorage() {
    return useContext(StorageContext);
}

export function StorageProvider({ children }) {

    const uploadImage = async (folderPath, imageFile) => {
        try {
            // Create a reference to the storage root with the specified folder path
            const storageRef = storage.ref().child(folderPath);

            // Upload the image file to the specified folder
            const imageRef = storageRef.child(imageFile.name);
            await imageRef.put(imageFile);

            // Get the download URL for the uploaded image
            const downloadURL = await imageRef.getDownloadURL();

            console.log("Image uploaded successfully:", downloadURL);

            return downloadURL; // Return the download URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const value = {
        uploadImage
    };

    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    );
}
