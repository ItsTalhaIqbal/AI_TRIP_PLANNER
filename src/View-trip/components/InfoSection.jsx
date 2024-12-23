import { Button } from '@/components/ui/button';
import React from 'react';
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {

    return (
        <div>
            <img
                src="/public/alter.webp"
                alt="alter"
                className='mx-auto rounded-lg h-[300px] w-full object-cover'
            />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-semibold text-2xl'>
                        {trip?.userSelection?.location}
                    </h2>
                    <div className='flex gap-5 items-center'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                            📅 {trip?.userSelection?.days} Day
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                            💸 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                            🥂 No. of Travelers: {trip?.userSelection?.travelWith}
                        </h2>
                        <Button
                        >
                            <IoIosSend size={20} />
                            Send
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InfoSection;
