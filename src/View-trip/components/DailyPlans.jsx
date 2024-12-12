import React from 'react'

const DailyPlans = ({ trip }) => {
    console.log("Data",trip?.tripData?.travelPlan?.itinerary


    );
    
    return (
        <div>
            <h2>Places to Visit</h2>

            <div>
                {
                   trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
                        <div>
                            <h2 className='font-medium text-lg'>{item}</h2>
                            <div>

                            </div>
                        </div>


                    ))


                }
            </div>

        </div>
    )
}

export default DailyPlans
