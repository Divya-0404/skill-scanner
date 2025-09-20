import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Function to fetch all documents from a collection
export async function fetchCollection(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Function to add a document to a collection
export async function addDocument(collectionName: string, data: object) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

// Function to update a document in a collection
export async function updateDocument(collectionName: string, docId: string, data: object) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
}

// Function to delete a document from a collection
export async function deleteDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}