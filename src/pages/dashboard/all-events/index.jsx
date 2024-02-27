import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../../context/FirestoreContext';
import DashBoard from '../../../components/frames/dashboard';
import EventCard from '../../../components/cards/event'

const AllEvent = () => {

    const [eventData, setEventData] = useState(true)
    const [loading, setLoading] = useState()

    const { getAllDocsAndFields: fetchEventsData } = useFirestore()

    useEffect(() => {
        const handleFetchBlogData = async () => {

            setLoading(true)

            try {
                const res = await fetchEventsData('events');
                setEventData(res)
            } catch (error) {
                console.error('Error while fetching event data: ', error)
            } finally {
                setLoading(false)
            }
        }

        handleFetchBlogData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DashBoard>
            {
                loading ? (
                    <>loading</>
                ) : (
                    eventData && eventData.map((data) => {
                        return (
                            <EventCard
                                key={data.id}
                                id={data.id}
                                eventTitle={data.eventTitle}
                                eventDesc={data.eventDesc}
                                eventType={data.eventType}
                                bannerImg={data.bannerImg}
                                eventImage={data.eventImage}
                                eventTimeline={data.eventTimeline}
                                hashtags={data.hashtags}
                                orgImgUrl={data.orgImgUrl}
                                orgName={data.orgName}
                                teamSize={data.teamSize}
                            />
                        )
                    })
                )
            }
        </DashBoard>
    )
}

export default AllEvent
