import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZqq1XOBKOHGYq1ltdxNrQda0vLJ-ASvY",
  authDomain: "munchertest-ba962.firebaseapp.com",
  projectId: "munchertest-ba962",
  storageBucket: "munchertest-ba962.appspot.com",
  messagingSenderId: "375223387549",
  appId: "1:375223387549:web:45ea732bf8b22ac4c0db74",
  measurementId: "G-W7J2QMVKSX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user ? user.uid : "")
      .get();
    if (query.docs.length === 0 && user) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  console.log("entro a login");
  console.log(email, password);
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    if (user) {
      await db.collection("users").add({
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordResetEmail = async (email: string) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
