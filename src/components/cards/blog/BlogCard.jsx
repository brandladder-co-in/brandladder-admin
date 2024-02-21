import React from 'react';

import { useFirestore } from '../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../components/tosters/natifications'
import EditModal from '../../../components/modal/editblog-modal/';

import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const BlogCard = ({ id, title, desc, domain, img, author, content }) => {

    const { deleteDocument: deleteBlog } = useFirestore();

    const truncateDescription = (description, maxLength) => {
        if (description.split(' ').length > maxLength) {
            return description.split(' ').slice(0, maxLength).join(' ') + '...';
        }
        return description;
    };

    // Truncate the description to the first 15 words
    const truncatedDesc = truncateDescription(desc, 15);

    const handleDeleteBlog = async () => {
        try {
            const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
            if (isConfirmed) {
                await deleteBlog('blogs', id)
                showSuccessToast(`${title} is deleted`)
            } else {
                console.log(`Delete "${title}" canceled`);
                showErrorToast('Something went wrong !! ')
            }
        } catch (error) {
            console.error(`error while deleting ${title}: `, error)
        }
    };
    return (
        <>
            <div className="card max-w-full my-4">
                <div className="card-body grid grid-cols-3">
                    <div className='col-span-2'>
                        <h2 className="card-header">{title}</h2>
                        {/* <span className="">{domain}</span> */}
                        <p className="text-content2">{truncatedDesc}</p>
                    </div>
                    <div className="card-footer col-span-1">
                        {/* <button className="btn-outline-secondary btn"><FaEdit /> </button> */}
                        <div className="popover popover-hover">
                            <label
                                className="popover-trigger my-2 btn btn-outline-secondary"
                                htmlFor="editblog-modal">
                                <FaEdit />
                            </label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">Edit {title}</div>
                            </div>
                        </div>
                        <div className="popover popover-hover">
                            <label className="popover-trigger my-2 btn btn-outline-secondary"><FaEye /></label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">See {title}</div>
                            </div>
                        </div>
                        <div className="popover popover-hover">
                            <label
                                className="popover-trigger my-2 btn btn-outline-error"
                                onClick={handleDeleteBlog}>
                                <MdDeleteOutline />
                            </label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">Delete {title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditModal id={id} title={title} desc={desc} img={img} content={content} />
        </>
    )
}

export default BlogCard
