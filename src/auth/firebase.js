import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify } from "../helpers/ToastNotify";



const firebaseConfig = {
  apiKey: "AIzaSyAgjhOI6LjlrZTd0Dx4yzhTetBLCEykFnU",
  authDomain: "filmproject-e4886.firebaseapp.com",
  projectId: "filmproject-e4886",
  storageBucket: "filmproject-e4886.appspot.com",
  messagingSenderId: "489834515591",
  appId: "1:489834515591:web:6ca467917ef5bb9ff53c22"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export const createUser = async (email, password, navigate, displayName) => {
  try{
    const userCredn = await createUserWithEmailAndPassword(auth, email,password)
    await updateProfile(auth.currentUser, {
      displayName: displayName

    })
    navigate("/")
    toastSuccessNotify("Successfull")
  }catch (error){
    alert(error.message);
  }
}

export const signIn = async (email, password, navigate) => {
  try{
    const loggedUser =  await signInWithEmailAndPassword(auth, email, password)
    navigate("/")
    toastSuccessNotify("Log in successfull")
  }catch (error){
    alert(error.message)
  }
}

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user)=>{
    if(user){
      const {email,displayName,photoURL} =user
      setCurrentUser({email,displayName,photoURL})
      console.log(user, "orası burası")
    }else{
      console.log("signed out");
      setCurrentUser(false)
    }
  })
}

export const logOut = () => {
  signOut(auth)
}

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate("/")
    toastSuccessNotify("Log in successfull")
  })
  .catch((error)=> {
    console.log(error)
  })
}