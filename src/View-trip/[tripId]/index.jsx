import { db } from '@/services/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection'
import HotelsInfo from '../components/HotelsInfo'
import DailyPlans from '../components/DailyPlans'

const View_Trip = () => {
    const { id } = useParams()
    const [trip, setTrip] = useState([])

    useEffect(() => {
        const get_Trip_data = async () => {
            const docRef = doc(db, "AITrips", id)
            const docSnap = await getDoc(docRef);
            docSnap.exists() ? console.log("document:", docSnap.data()) :
                console.log("no such document");
            setTrip(docSnap.data())
        }
        get_Trip_data()
    }, [id])

    return (
        <div className="max-w-[1300px] mx-auto px-6 mt-10">
             {/* //info section */}
            <InfoSection trip={trip} />

           {/* // hotels section */}
            <HotelsInfo trip={trip}/>

           {/* //Daily plans */}
            <DailyPlans trip={trip}/>
           {/* //Footer */}
        </div>
    )
}

export default View_Trip
