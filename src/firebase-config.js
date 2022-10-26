import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDSwCCqpBo6PXq0u1NNEmdvkz_QgqTLI2s",
  authDomain: "testhosting-20d8a.firebaseapp.com",
  projectId: "testhosting-20d8a",
  storageBucket: "testhosting-20d8a.appspot.com",
  messagingSenderId: "977394299888",
  appId: "1:977394299888:web:0aa14e60da334bda002335",
  measurementId: "G-JMTVE148YN"
  };

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db,storage,app };