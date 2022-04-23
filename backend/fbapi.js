const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUkQYpfqj3KJnNrW8qyPaXjpdVjtpOqD8",
  authDomain: "best-hack-final.firebaseapp.com",
  databaseURL: "https://best-hack-final-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "best-hack-final",
  storageBucket: "best-hack-final.appspot.com",
  messagingSenderId: "846454461866",
  appId: "1:846454461866:web:4cec5ffd27aa985b0987d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
module.exports = {app, db};
console.log("Firebase initialized");