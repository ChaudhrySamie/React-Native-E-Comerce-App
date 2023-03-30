import { initializeApp } from "firebase/app";
import {
    getFirestore, collection,
    addDoc, doc, getDoc, query,
    where, getDocs, updateDoc
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert } from "react-native";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARiqf51fwEkRZlFAq5YUraDt5KuPBauVs",
  authDomain: "reactnativeolx-ba4c0.firebaseapp.com",
  projectId: "reactnativeolx-ba4c0",
  storageBucket: "reactnativeolx-ba4c0.appspot.com",
  messagingSenderId: "1017970986831",
  appId: "1:1017970986831:web:5a1f56bef648ee7296ff3a",
  measurementId: "G-3WFHN56VCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);

// SignUp Function

async function signUp(email, password,firstname,lastname,contactno,profilePic) {
console.log("Email get", email)
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password,firstname,lastname,contactno)
        console.log("Try", email)
        // console.log(res.user.uid)
        const uid = res.user.uid
        const docRef = await addDoc(collection(db, "users"), {
            email: email,
            password: password,
            uid: uid,
            firstname:firstname,
            lastname:lastname,
            contactno:contactno,
            profilePic:profilePic,
            
        });
        alert("User created successfully !!")
        console.log("User created")
        console.log("Document written with ID: ", docRef.id);
        return { error: false, message: "user created" }
    }
    catch (error) {
        console.log(error.message)
        alert(error.message)
        return { error: true, message: "user not created" }
    }
}


// async function getImageURL(imageData) {
//     const fileName = imageData.uri.split("/").pop();
//     try {
//       const imageRef = ref(storage, "images/" + fileName);
//       const img = await fetch(imageData.uri);
//       const bytes = await img.blob();
//       const res = await uploadBytes(imageRef, bytes);
//       const url = await getDownloadURL(res.ref);
//       return url;
//     } catch (error) {
//       console.log("error", error.message);
//     }
//   }


// SignIn Function

async function signIn(email, password) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
        console.log("fb res", res)
        alert('User login successful')
        return { error: false, message: "User logged in" }
    }
    catch (error) {
        alert(error.message)
        return { error: true, message: error.message }

    }
}

async function getCurrentUserData() {
    console.log("getCurrentUserData")
    const uid = getAuth().currentUser.uid
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot", querySnapshot)

    let copyArray = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        copyArray.push(doc.data())
    });
    console.log("copyArray==>", copyArray)

    return copyArray[0]
}


// Creat Add Function
async function createAd(title, descryption, price,addpic) {
  const uid = getAuth().currentUser.uid
    try {
        const docRef = await addDoc(collection(db, "ads"), {
            title, descryption, price,addpic,
            uid: uid
        });
        alert("Add created successfully!")
        console.log("Posted", docRef.id)
        const updateDocRef = doc(db, "ads", docRef.id);
        await updateDoc(updateDocRef, {
            docId: docRef.id
        });
    }
    catch (error) {
        console.log(error.message)
    }
}


async function uploadImage(imageData) {
    console.log("Image data is", imageData)
    console.log("Image data Name", imageData[0])
    try {
        const imageRef = ref(storage, "ads/" + imageData[0].addpic)
        const res = await uploadBytes(imageRef, imageData[0])
        console.log("Result==>", res)
        const url = await getDownloadURL(res.ref)
        console.log("URL is", url)
        return url
    }
    catch (error) {
        console.log(error.message)
    }
}

// Get all Ads Function
async function getAllAds() {
    console.log("Trying")
    try {
        const q = query(collection(db, "ads"));

        const querySnapshot = await getDocs(q);
        let array = []
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        return { error: false, message: "success", data: array }
    }
    catch (error) {
        return { error: true, message: error.message, data: [] }
    }

}

async function getAdsDetail(adId) {

    const docRef = doc(db, "ads", adId);
    const docSnap = await getDoc(docRef);
    try {
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    catch (error) {
        console.log(error.message)
    }


}


async function getCurrentUserAds() {
    const uid = getAuth().currentUser.uid
    try {
        const q = query(collection(db, "ads"),
            where("uid", "==", uid));

        const querySnapshot = await getDocs(q);
        let array = []
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
        });
        return { error: false, message: "success", data: array }
    }
    catch (error) {
        return { error: true, message: error.message, data: [] }
    }
}




export {
    auth,
    uploadImage,
    signUp,
    signIn,
    createAd,
    getAllAds,
    getCurrentUserData,
    getCurrentUserAds,
    // getImageURL

}