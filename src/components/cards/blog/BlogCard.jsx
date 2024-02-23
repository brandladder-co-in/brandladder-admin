import React from 'react';

import { useFirestore } from '../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../components/tosters/natifications'
import EditModal from '../../../components/modal/editblog-modal/';

import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ViewBlogModal from '../../modal/view-modal';

const BlogCard = ({ id, title, desc, domain, img, metaTags, content, author }) => {

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
                        <span className="badge badge-outline-secondary">{domain}</span>
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
                                <div className="p-4 text-sm">Edit {title}</div>
                            </div>
                        </div>
                        <div className="popover popover-hover">
                            <label
                                className="popover-trigger btn-sm btn-outline-secondary"
                                htmlFor={`view${id}`}
                            >
                                <FaEye className='my-auto' />
                            </label>
                            <div className="popover-content">
                                <div className="popover-arrow"></div>
                                <div className="p-4 text-sm">Preview of {title}</div>
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
                                <div className="p-4 text-sm">Delete {title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditModal id={id} title={title} metaTags={metaTags} desc={desc} img={img} content={content} />
            <ViewBlogModal
                id={id}
                title={title}
                desc={desc}
                domain={domain}
                img={img}
                metaTags={metaTags}
                content={content}
                author={author}
            />
        </>
    )
}

export default BlogCard
