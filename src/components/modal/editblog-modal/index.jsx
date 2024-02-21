import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useFirestore } from '../../../context/FirestoreContext';

const EditModal = ({ id, title, desc, img, content }) => {

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedImg, setUpdatedImg] = useState(img);
    const [updateDesc, setUpdateDesc] = useState(desc);
    const [updateContent, setUpdatedContent] = useState(content);

    const { updateDocumentData: updateBlog } = useFirestore();
    const editor = useRef(null);

    const handleKeyDown = (event, editor) => {

    };

    const handleUpdate = async () => {
        try {
            const updatedBlogData = {
                blogTitle: updatedTitle,
                date: new Date().toISOString(),
                titleImage: updatedImg,
                blogDesc: updateDesc,
                blogContent: updateContent,
            }

            // await updateBlog('blogs', id, updatedBlogData)
            console.log(updatedBlogData)
        } catch (error) {
            console.error(`error while updating blog: ${title} data: `, error)
        }
    }


    return (
        <div>
            <input className="modal-state" id="editblog-modal" type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="editblog-modal"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                    <label htmlFor="editblog-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    {/* <form className="bg-gray-2 shadow-xl rounded p-10"> */}
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="blogTitle">
                            Blog Title
                        </label>
                        <input
                            className="input-ghost-secondary input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="blogTitle"
                            type="text"
                            placeholder="Enter blog title"
                            name="blogTitle"
                            value={updatedTitle}
                            onChange={(e) => { setUpdatedTitle(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="blogDesc">
                            Blog Description
                        </label>
                        <textarea
                            className="textarea-ghost-secondary textarea shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="blogDesc"
                            placeholder="Enter blog description"
                            name="blogDesc"
                            value={updateDesc}
                            onChange={(e) => { setUpdateDesc(e.target.value) }}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block my-auto text-white text-sm font-bold mb-2" htmlFor="titleImage">
                            Title Image
                        </label>
                        <input
                            className="input-ghost-secondary input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="titleImage"
                            type="text"
                            placeholder="Enter image name"
                            name="titleImage"
                            value={updatedImg}
                            onChange={(e) => { setUpdatedImg(e.target.value) }}
                            required
                        />
                    </div>
                    {/* </form> */}
                    <div className="bg-gray-2">
                        <JoditEditor
                            className='text-black'
                            ref={editor}
                            value={updateContent}
                            tabIndex={1}
                            onBlur={(newContent) => setUpdatedContent(newContent)}
                            onChange={(newContent) => setUpdatedContent(newContent)}
                            onInit={(editor) => {
                                editor.events.on('keydown', (event) => {
                                    handleKeyDown(event, editor);
                                });
                            }}
                        />
                    </div>
                    <div className="flex gap-3 my-6">
                        <button className="btn btn-outline-error btn-block">Cancel</button>
                        <button className="btn btn-outline-secondary btn-block" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal
