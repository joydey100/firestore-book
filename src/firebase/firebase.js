import app from "./firebase.config";
import { getFirestore, collection } from "firebase/firestore";

// invoking app function and initialize
app();

// get firestoreApp and creating Database
const db = getFirestore(app());

// creating a collection
const bookCollection = collection(db, "books");

export { bookCollection, db };
