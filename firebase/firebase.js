import {initializeApp} from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
  indexedDBLocalPersistence,
} from 'firebase/auth/react-native';
import {getStorage} from 'firebase/storage';
import {getFirestore, initializeFirestore} from 'firebase/firestore';
import {
  updatePassword,
  signInWithCredential,
  getRedirectResult,
  getAuth,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  onValue,
  get,
  child,
  getDatabase,
  ref as firebaseRef,
  set as firebaseSet,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDo9UepeFrZTo3Z5MHFnZfQh9Sh1azgWxI',
  authDomain: 'smitapp-d6b43.firebaseapp.com',
  databaseURL:
    'https://smitapp-d6b43-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'smitapp-d6b43',
  storageBucket: 'smitapp-d6b43.appspot.com',
  appId: '1:192850043411:android:ce6dd460f9a58e93ab55e6',
  messagingSenderId: '192850043411',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export {
  updatePassword,
  signInWithCredential,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onValue,
  get,
  child,
  sendEmailVerification,
  firebaseSet,
  firebaseRef,
  app,
  auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
};
