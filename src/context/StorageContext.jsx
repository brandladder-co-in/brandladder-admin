import { createContext, useContext } from "react";
// import { storage } from "../config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const StorageContext = createContext();

export function useStorage() {
    return useContext(StorageContext);
}

export function StorageProvider({ children }) {

    const storageRef = ref(getStorage(), 'images');

    const uploadImage = async (imageFile, dir) => {
        try {
            const imagePath = `${dir}/${imageFile.name}`;
            const snapshot = await uploadBytes(ref(storageRef, imagePath), imageFile);

            // Get download URL of the uploaded image
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
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
