import { db } from '@/services/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const View_Trip = () => {
    const { id } = useParams()

    useEffect(() => {
        const get_Trip_data = async () => {
            const docRef = doc(db, "AITrips", id)
            const docSnap = await getDoc(docRef);
            docSnap.exists()? console.log("document:",docSnap.data()):
            console.log("no such document");
            
            
        }
        get_Trip_data()
    }, [id])

    return (
        <div>
            view trip : {id}
        </div>
    )
}

export default View_Trip
