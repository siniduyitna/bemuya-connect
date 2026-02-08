import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ይህንን መረጃ ከ Firebase Project Settings -> Your Apps ስር ካለው ጋር ቀይረው
const firebaseConfig = {
  apiKey: "AIzaSy...", // የአንተ እውነተኛ API Key
  authDomain: "bemuyaconnect777.firebaseapp.com",
  projectId: "bemuyaconnect777",
  storageBucket: "bemuyaconnect777.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ይቺ መስመር export መደረጓን እና መጨረሻ ላይ መኖሯን አረጋግጥ