import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="flex flex-col items-center mx-5 gap-5 p-0 lg:mx-16 xl:mx-24">
            <h1 className="mt-10 text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-center">
                <span className="text-[#007DFC]">Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 text-center max-w-4xl">
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={'/create-trip'}>
                <Button className="w-[120px] sm:w-[140px] h-10 sm:h-11 text-base sm:text-lg mt-6 sm:mt-10">
                    Get Started
                </Button>
            </Link>
            <img 
                src="/public/landing.png" 
                alt="Landing img" 
                className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl -mt-[20px] object-contain" 
            />
        </div>
    )
}

export default Hero
