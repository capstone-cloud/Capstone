import firebase from "firebase";
import "@firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeRhE5XKdDTo6yLQGYTDdbvohpjdjH218",
  authDomain: "not-a-race.firebaseapp.com",
  databaseURL: "https://not-a-race.firebaseio.com",
  projectId: "not-a-race",
  storageBucket: "",
  messagingSenderId: "599976808896",
  appId: "1:599976808896:web:54d9570d452d6118"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const firestore = firebase.firestore();
export default firebase;
