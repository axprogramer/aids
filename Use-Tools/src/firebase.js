import { initializeApp, getApps } from 'firebase/app'
import { getDatabase, ref, push, onValue, query, limitToLast } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getDatabase(app)

export function writeGcdCalculation(a, b, result) {
  const calculationsRef = ref(db, 'tools/gcd/calculations')
  return push(calculationsRef, {
    a,
    b,
    result,
    createdAt: Date.now(),
  })
}

export function subscribeToRecentCalculations(callback, limit = 10) {
  const calculationsRef = ref(db, 'tools/gcd/calculations')
  const q = query(calculationsRef, limitToLast(limit))
  return onValue(q, (snapshot) => {
    const items = []
    snapshot.forEach((child) => {
      items.push({ id: child.key, ...child.val() })
    })
    items.sort((x, y) => x.createdAt - y.createdAt)
    callback(items)
  })
}