import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, orderByChild, equalTo, query } from "firebase/database";
import { v4 as uuid } from 'uuid';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  })
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then(snapshot => {
      if (snapshot.exists())
      {
        const admins = snapshot.val()
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin }
      }
    }).catch(console.error)
}



export async function addNewCity(city, check) {
  const id = uuid();
  set(ref(database, `citys/${id}`), {
    ...city,
    new: check,
    id
  })
}

export async function getAreas() {
  return get(ref(database, 'areas'))
    .then(snapshot => {
      if (snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
      return [];
    })
}

export async function getCitys() {
  return get(ref(database, 'citys'))
    .then(snapshot => {
      if (snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
      return [];
    })
}




export async function getCity(city) {
  const temp = query(ref(database, 'citys'), orderByChild('city_nm'), equalTo(city));
  return get(temp)
    .then(snapshot => {
      if (snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
      return [];
    })
}

console.log(getCity());

export async function addNewItem(item) {
  const id = uuid();
  set(ref(database, `${item.category}/${id}`), {
    name: item.name,
    order: parseInt(item.order),
    id
  })
}