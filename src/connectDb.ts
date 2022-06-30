import { cert, initializeApp, getApps, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from '../credentials'

export const connectDb =() =>{
    if(!getApps().length){
initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
    })
    }
    return getFirestore();
}