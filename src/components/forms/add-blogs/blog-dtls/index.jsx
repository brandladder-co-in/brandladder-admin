import React, { useState, useRef } from 'react';
// import { useNavigation } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useFirestore } from '../../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../tosters/natifications'

const BlogDtls = () => {

    const [activeTab, setActiveTab] = useState('editor');
    const [title, setTitle] = useState('');
    const [metaTags, setMetaTags] = useState([]);
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [author, setAuthor] = useState('');
    const [dom, setDom] = useState('Default');
    const [htmlcontent, setHtmlContent] = useState('');

    const { storeData: uploadBlog } = useFirestore()
    const editor = useRef(null);
    // const navigate = useNavigation();

    const blogData = {
        blogTitle: title,
        metaTags: metaTags.map(tag => tag.trim()),
        blogDesc: desc,
        titleImage: img,
        writerName: author,
        domain: dom,
        date: new Date().toISOString(),
        blogContent: htmlcontent,
    };

    const handleMetaTagsChange = (e) => {
        const tags = e.target.value.split(',');
        setMetaTags(tags);
    };

    const handleKeyDown = (event, editor) => {
        // const selection = editor.selection;
        // const selectedElement = selection.current();
        // console.log(selectedElement);
    };

    const handleInputAfterSubmit = () => {
        setTitle('')
        setMetaTags('')
        setDesc('')
        setImg('')
        setAuthor('')
        setDom('')
        setHtmlContent()
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = async () => {

        try {
            const currentDate = new Date().toISOString()

            if (title !== '' && desc !== '' && img !== '' && author !== '' && dom !== '' && htmlcontent !== '') {
                await uploadBlog('blogs', currentDate, blogData)
                // console.log(blogData)
                showSuccessToast('Blog Uploadeed Successfully !!')
                handleInputAfterSubmit()
            }

        } catch (error) {
            console.log('error while uploading blog: ', error);
            showErrorToast('Somwething went wrong !!')
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div onSubclassName="bg-gray-2 shadow-xl rounded p-10">
                <h1 className='text-center text-3xl my-5'>Blog Details</h1>
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
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="metaTags">
                        Meta Tags (Separated by comma)
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="metaTags"
                        type="text"
                        placeholder="Enter meta tags"
                        value={metaTags.join(',')} // Join the array of tags with comma to display in the input field
                        onChange={handleMetaTagsChange}
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
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value) }}
                        required
                    ></textarea>
                </div>
                <div className="mb-4 space-x-4">
                    <label className="block my-auto text-white text-sm font-bold mb-2" htmlFor="titleImage">
                        Title Image
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="titleImage"
                        type="text"
                        placeholder="Enter image name"
                        name="titleImage"
                        value={img}
                        onChange={(e) => { setImg(e.target.value) }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="writerName">
                        Writer's Name
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="writerName"
                        type="text"
                        placeholder="Enter writer's name"
                        name="writerName"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="domain">
                        Domain
                    </label>
                    <select
                        className="input-ghost-secondary bg-gray-2 input shadow max-w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="domain"
                        name="domain"
                        value={dom}
                        onChange={(e) => { setDom(e.target.value) }}
                        required
                    >
                        <option value="Default">Default</option>
                        <option value="tech_services">Technology</option>
                        <option value="digital_services">Digitial Services</option>
                        <option value="ca_services">CA and Registration Service</option>
                    </select>
                </div>
            </div>
            <div className="max-w-5xl bg-gray-2 mx-auto px-10 py-4">
                <div className="tabs mx-auto mb-6">
                    <div className="tabs tabs-boxed space-x-2">
                        <input type="radio" id="tab-13" name="tab-5" className="tab-toggle" defaultChecked />
                        <label htmlFor="tab-13" className="tab" onClick={() => handleTabChange('editor')}>
                            Text Editor
                        </label>

                        <input type="radio" id="tab-14" name="tab-5" className="tab-toggle" />
                        <label htmlFor="tab-14" className="tab" onClick={() => handleTabChange('text')}>
                            Upload Document
                        </label>
                    </div>
                </div>
                <div className="tab-content max-w-full ">
                    {activeTab === 'editor' && (
                        <JoditEditor
                            className='text-black w-1'
                            ref={editor}
                            value={htmlcontent}
                            tabIndex={1}
                            onBlur={(newContent) => setHtmlContent(newContent)}
                            onChange={(newContent) => setHtmlContent(newContent)}
                            onInit={(editor) => {
                                editor.events.on('keydown', (event) => {
                                    handleKeyDown(event, editor);
                                });
                            }}
                        />
                    )}
                    {activeTab === 'text' && (
                        <>
                            <h1>comming soon</h1>
                        </>
                    )}
                </div>
                <button
                    className='btn btn-outline-secondary w-full mx-auto text-center mt-10'
                    onClick={handleSubmit}>
                    Submit Quiz
                </button>
            </div>
        </div>
    )
}

export default BlogDtls;
