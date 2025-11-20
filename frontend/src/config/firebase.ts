import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ NHỚ thay thông tin này bằng Firebase config thật của bạn!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

// 👇 Đây là cái bạn cần! (để products.ts import được)
export const db = getFirestore(app);
