import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='  flex flex-col items-center  mx-5 gap-5 p-0'>
            <h1 className='mt-10 text-[56px]  font-extrabold text-center'><span className='text-[#007DFC]'>Discover Your Next Adventure With AI:</span>  Personalized Itineraries at Your Fingertips</h1>
            <p className='text-2xl text-gray-500 text-center'>Your Personal trip planner and travel curator , creating custom Itineraries tailored to your intersts and budget </p>
            <Link to={'/create-trip'}>
                <Button className="w-[140px] h-11 text-lg mt-10">Get Started</Button>
            </Link>
        </div>
    )
}

export default Hero
