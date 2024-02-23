import React, { useState, useEffect } from 'react';
// import { useFirestore } from '../../../context/FirestoreContext';

const ViewBlogModal = ({ id, title, desc, domain, img, metaTags, content, author }) => {

    const [readingTime, setReadingTime] = useState(0);
    // const { getDocumentData: fetchBlogData } = useFirestore()

    const calculateReadingTime = (htmlContent) => {
        const plainText = htmlContent.replace(/<[^>]+>/g, '');

        const wordsPerMinute = 200;

        const words = plainText.trim().split(/\s+/);

        const wordCount = words.length;

        const timeInMinutes = wordCount / wordsPerMinute;

        const roundedTime = Math.ceil(timeInMinutes);

        setReadingTime(roundedTime);
    };


    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // const handleCloseModal = () => {
    //     try {
    //         document.getElementById('editblog-modal').checked = false
    //     } catch (error) {
    //         console.error('Error whiel closing modal: ', error)
    //     }
    // }

    useEffect(() => {
        calculateReadingTime(content)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <input className="modal-state" id={`view${id}`} type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor={`view${id}`}></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl" style={{ background: '#ffeeef' }}>
                    <label
                        htmlFor={`view${id}`}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-black"
                    // onClick={handleCloseModal}
                    >
                        ✕
                    </label>
                    <div className="w-11/12 md:w-4/6 mx-auto space-y-6">
                        <div className="my-10">
                            <h1 className='text-black font-bold text-2xl md:text-5xl'>{title}</h1>
                        </div>
                        <div className="card flex flex-row space-x-4 shadow-none w-full bg-inherit">
                            <div className='rounded-full col-span-1 max-h-16 max-w-16'>
                                <img src={img} alt="" className='rounded-full mx-auto my-auto' />
                            </div>
                            <div className='col-span-2'>
                                <div className="text-black">{author}</div>
                                <p className='text-xs text-black'>
                                    {formatDate(id)} <br />
                                    {readingTime} min{readingTime !== 1 ? 's' : ''} read <br />
                                    {/* {domain} */}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className='col-span-1 mx-auto'>
                                <img src={img} alt={title} className='w-screen h-full' />
                            </div>
                            <div className="col-span-2 my-auto text-black">
                                {desc}
                            </div>
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                        <div></div>

                        {/* {blogData.metaTags} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBlogModal
