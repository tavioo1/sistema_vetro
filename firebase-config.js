import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2ShTbZe6XwUq2woGy9la-mCn_BhC263c",
  authDomain: "vetro-tavioo.firebaseapp.com",
  databaseURL: "https://vetro-tavioo-default-rtdb.firebaseio.com",
  projectId: "vetro-tavioo",
  storageBucket: "vetro-tavioo.firebasestorage.app",
  messagingSenderId: "675152105558",
  appId: "1:675152105558:web:d1d295ee6491aeae23abf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);