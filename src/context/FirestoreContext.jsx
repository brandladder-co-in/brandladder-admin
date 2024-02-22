import { createContext, useContext } from "react";
import { db } from "../config/firebaseConfig";
import {
    collection,
    getDocs,
    // addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const FirestoreContext = createContext();

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {

    const storeData = async (collectionName, docId, data) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const res = await setDoc(docRef, data);
            return res;
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    const storeDocId = async (collectionName, docId) => {
        try {
            // Create a new document with the specified docId and empty data
            await setDoc(doc(db, collectionName, docId), {});

            console.log("Document ID stored successfully:", docId);
        } catch (error) {
            console.error("Error storing document ID: ", error);
        }
    };


    const getAllDocIds = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const docIds = [];
            querySnapshot.forEach((doc) => {
                docIds.push(doc.id);
            });
            return docIds;
        } catch (error) {
            console.error("Error getting document IDs: ", error);
            return [];
        }
    };

    const getDocumentData = async (collectionName, docId) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return { id: docSnapshot.id, ...docSnapshot.data() };
            } else {
                console.error("No such document exists!");
                return null;
            }
        } catch (error) {
            console.error("Error getting document data: ", error);
            return null;
        }
    };

    const getAllDocsAndFields = async (collectionName) => {
        try {
            // Get all document IDs in the collection
            const docIds = await getAllDocIds(collectionName);

            // Fetch data for each document
            const docsWithData = await Promise.all(docIds.map(async (docId) => {
                const docData = await getDocumentData(collectionName, docId);
                return { id: docId, ...docData };
            }));

            return docsWithData;
        } catch (error) {
            console.error("Error fetching all document IDs and fields: ", error);
            return [];
        }
    };

    const updateDocumentData = async (collectionName, docId, updatedBlogData) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                // Update the document with the provided data
                const res = await updateDoc(docRef, updatedBlogData);
                console.log(`Blog with ID ${docId} updated successfully!`);
                return res;
            } else {
                console.error("No such blog document exists!");
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const deleteDocument = async (collectionName, docId) => {
        try {
            const res = await deleteDoc(doc(db, collectionName, docId));
            return res;
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const value = {
        storeData,
        storeDocId,
        getAllDocIds,
        getDocumentData,
        getAllDocsAndFields,
        deleteDocument,
        updateDocumentData
    };

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
}
