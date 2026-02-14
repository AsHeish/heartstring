// Valentine Data Service - Handles all Firebase operations

import {
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

export interface Photo {
    url: string;
    caption: string;
}

export interface ValentineData {
    id: string;
    hisName: string;
    herName: string;
    petName?: string;
    herBirthdate: string; // YYYY-MM-DD format for verification
    relationshipStartDate: string;
    photos: Photo[];
    reasons: string[];
    loveMessage: string;
    backgroundMusicUrl?: string;
    createdAt: Date;
}

const COLLECTION_NAME = 'valentines';

// Generate unique ID from names and birthdate
export const generateValentineId = (hisName: string, herName: string, herBirthdate: string): string => {
    const combined = `${hisName.toLowerCase()}-${herName.toLowerCase()}-${herBirthdate}`;
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    const prefix = hisName.charAt(0).toLowerCase() + herName.charAt(0).toLowerCase();
    return `${prefix}${Math.abs(hash).toString(36).substring(0, 6)}`;
};

// Save valentine data to Firestore
export const saveValentineData = async (data: Omit<ValentineData, 'id' | 'createdAt'>): Promise<string> => {
    const id = generateValentineId(data.hisName, data.herName, data.herBirthdate);

    const valentineDoc = {
        ...data,
        id,
        createdAt: new Date(),
    };

    await setDoc(doc(db, COLLECTION_NAME, id), valentineDoc);
    return id;
};

// Get valentine data by ID
export const getValentineData = async (id: string): Promise<ValentineData | null> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as ValentineData;
    }
    return null;
};

// Verify birthdate matches
export const verifyBirthdate = async (id: string, birthdate: string): Promise<ValentineData | null> => {
    const data = await getValentineData(id);

    if (data && data.herBirthdate === birthdate) {
        return data;
    }
    return null;
};

// Upload photo to Firebase Storage
export const uploadPhoto = async (file: File, valentineId: string, index: number): Promise<string> => {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${valentineId}/photo_${index}.${fileExtension}`;
    const storageRef = ref(storage, `photos/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
};

// Upload music to Firebase Storage
export const uploadMusic = async (file: File, valentineId: string): Promise<string> => {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${valentineId}/music.${fileExtension}`;
    const storageRef = ref(storage, `audio/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    return downloadUrl;
};

// Check if ID already exists
export const checkIdExists = async (id: string): Promise<boolean> => {
    const data = await getValentineData(id);
    return data !== null;
};
