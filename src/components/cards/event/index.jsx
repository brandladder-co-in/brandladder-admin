import React from 'react';

import { useFirestore } from '../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../components/tosters/natifications'

import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EventEditModal from '../../modal/events/edit-modal';

const BlogCard = ({ id, eventTitle, eventDesc, eventType, bannerImg, eventImage, eventTimeline, hashtags, orgImgUrl, orgName, teamSize }) => {

    const { deleteDocument: deleteBlog } = useFirestore();

    const truncateDescription = (description, maxLength) => {
        if (description.split(' ').length > maxLength) {
            return description.split(' ').slice(0, maxLength).join(' ') + '...';
        }
        return description;
    };

    // Truncate the description to the first 15 words
    const truncatedDesc = truncateDescription(eventDesc, 15);

    const handleDeleteBlog = async () => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete "${eventTitle}"?`);
            if (isConfirmed) {
                await deleteBlog('events', id)
                showSuccessToast(`${eventTitle} is deleted`)
            } else {
                console.log(`Delete "${eventTitle}" canceled`);
                showErrorToast('Something went wrong !! ')
            }
        } catch (error) {
            console.error(`error while deleting ${eventTitle}: `, error)
        }
    };
    return (
        <>
            <div className="card max-w-full my-4">
                <div className="card-body grid grid-cols-3">
                    <div className='col-span-2'>
                        <h2 className="card-header">{eventTitle}</h2>
                        <span className="badge badge-outline-secondary">
                            {
                                hashtags?.map((data, index) => {
                                    return (
                                        <p key={index} className='text-secondary' >#{data}</p>
                                    )
                                })
                            }
                        </span>
                        <p className="text-content2">{truncatedDesc}</p>
                    </div>
                    <div className="card-footer col-span-1 space-x-3 flex-wrap mx-auto text-center">
                        {/* <button className="btn-outline-secondary btn"><FaEdit /> </button> */}
                        <div className="popover popover-hover">
                            <label
                                className="popover-trigger btn-sm btn-outline-secondary"
                                htmlFor={id}>
                                <FaEdit className='my-auto' />
                            </label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">Edit {eventTitle}</div>
                            </div>
                        </div>
                        <div className="popover popover-hover">
                            <label
                                className="popover-trigger btn-sm btn-outline-error"
                                onClick={handleDeleteBlog}>
                                <MdDeleteOutline className='my-auto' />
                            </label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">Delete {eventTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EventEditModal
                id={id}
                eventTitle={eventTitle}
                eventDesc={eventDesc}
                eventType={eventType}
                bannerImg={bannerImg}
                eventImage={eventImage}
                eventTimeline={eventTimeline}
                hashtags={hashtags}
                orgImgUrl={orgImgUrl}
                orgName={orgName}
                teamSize={teamSize}
            />
        </>
    )
}

export default BlogCard
