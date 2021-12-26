import firebase from "firebase";
//https://medium.com/javascript-in-plain-english/react-native-firebase-email-authenticaton-in-an-expo-project-2e413e9a4890
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCtH6F6_WNX-Z0MO9TzAwQD6Mn8hK8x00I",
  authDomain: "assetmanager-5ee72.firebaseapp.com",
  databaseURL: "https://assetmanager-5ee72-default-rtdb.firebaseio.com",
  projectId: "assetmanager-5ee72",
  storageBucket: "assetmanager-5ee72.appspot.com",
  messagingSenderId: "342123066999",
  appId: "1:342123066999:web:6d49a024d64c8535c73872"
};

/*if (!firebase.apps.length) {
  // Initialize Firebase
  let Firebase = firebase.initializeApp(firebaseConfig);
} else {
  let Firebase = firebase.app(); // if already initialized, use that one
}*/
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
