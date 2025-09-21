import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebaseConfig";

// Mock data for development when Firebase is not configured
const mockData: Record<string, any[]> = {
  quizzes: [],
  users: [],
  progress: []
};

// Function to fetch all documents from a collection
export async function fetchCollection(collectionName: string): Promise<any[]> {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured, returning mock data');
    return mockData[collectionName] || [];
  }
  
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching collection:', error);
    return mockData[collectionName] || [];
  }
}

// Function to add a document to a collection
export async function addDocument(collectionName: string, data: object): Promise<string> {
  if (!isFirebaseConfigured()) {
    const id = Date.now().toString();
    mockData[collectionName] = mockData[collectionName] || [];
    mockData[collectionName].push({ id, ...data });
    console.warn('Firebase not configured, added to mock data');
    return id;
  }
  
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

// Function to update a document in a collection
export async function updateDocument(collectionName: string, docId: string, data: object): Promise<void> {
  if (!isFirebaseConfigured()) {
    const collection = mockData[collectionName] || [];
    const index = collection.findIndex(item => item.id === docId);
    if (index !== -1) {
      mockData[collectionName][index] = { ...mockData[collectionName][index], ...data };
    }
    console.warn('Firebase not configured, updated mock data');
    return;
  }
  
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

// Function to delete a document from a collection
export async function deleteDocument(collectionName: string, docId: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    mockData[collectionName] = mockData[collectionName]?.filter(item => item.id !== docId) || [];
    console.warn('Firebase not configured, deleted from mock data');
    return;
  }
  
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Function to get user progress (useful for dashboard)
export async function getUserProgress(userId: string): Promise<any> {
  if (!isFirebaseConfigured()) {
    return {
      userId,
      totalQuizzes: 5,
      completedQuizzes: 3,
      averageScore: 85,
      skills: {
        'Technical Skills': 90,
        'Problem Solving': 85,
        'Communication': 80,
        'Leadership': 75
      },
      recentQuizzes: [
        { profession: 'Software Developer', score: 90, date: new Date().toISOString() },
        { profession: 'Data Scientist', score: 85, date: new Date().toISOString() },
        { profession: 'UX Designer', score: 80, date: new Date().toISOString() }
      ]
    };
  }
  
  // In a real implementation, you would fetch this from Firestore
  return { userId, totalQuizzes: 0, completedQuizzes: 0, averageScore: 0 };
}

// Function to save quiz results
export async function saveQuizResult(userId: string, quizData: any): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase not configured, quiz result not saved');
    return;
  }
  
  try {
    await addDocument('quiz_results', {
      userId,
      ...quizData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
}