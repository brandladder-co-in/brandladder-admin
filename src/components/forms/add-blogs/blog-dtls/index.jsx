import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import useEmailAuth from '../../../../hooks/auth/useEmailAuth';
import { useFirestore } from '../../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../tosters/natifications'

const BlogDtls = () => {

    // const [activeTab, setActiveTab] = useState('editor');
    const [authorData, setAuthorData] = useState()
    const [title, setTitle] = useState('');
    const [metaTags, setMetaTags] = useState([]);
    const [focusKeywords, setFocusKeywords] = useState([]);
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [author, setAuthor] = useState('');
    const [dom, setDom] = useState('Default');
    const [aditionalURL, setAditionalURL] = useState('');
    const [htmlcontent, setHtmlContent] = useState('');
    const [archiveState, setArchiveState] = useState();

    const { storeData: uploadBlog, getDocumentData: getAuthorData } = useFirestore()
    const { currentUser } = useEmailAuth();
    const editor = useRef(null);

    const blogData = {
        blogTitle: title,
        metaTags: metaTags?.map(tag => tag.trim()),
        focusKeywoerds: focusKeywords?.map(tag => tag.trim()),
        blogDesc: desc,
        titleImage: img,
        writerName: author,
        writerEmail: currentUser.email,
        domain: dom,
        date: new Date().toISOString(),
        blogContent: htmlcontent,
        archive: archiveState,
        aditionalURL: aditionalURL,
        authorData: authorData,
    };

    // console.log(currentUser.email)

    const handleMetaTagsChange = (e) => {
        const tags = e.target.value.split(',');
        setMetaTags(tags);
    };

    const handleFocusKeywoerdsChange = (e) => {
        const tags = e.target.value.split(',');
        setFocusKeywords(tags);
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
        setAditionalURL('')
        setHtmlContent()
    }

    // const handleTabChange = (tab) => {
    //     setActiveTab(tab);
    // };

    const handleAuthorData = async () => {
        try {
            const res = await getAuthorData('admins', currentUser.email)
            setAuthorData(res)
        } catch (error) {
            console.error('Error while fetching author data: ', error);
        }
    }

    const handleSubmit = async () => {
        try {
            // const currentDate = new Date().toISOString()

            if (title !== '' && desc !== '' && img !== '' && author !== '' && dom !== '' && htmlcontent !== '') {
                await uploadBlog('blogs', title, blogData)
                // console.log(blogData)
                showSuccessToast('Blog Uploadeed Successfully !!')
                handleInputAfterSubmit()
            }

        } catch (error) {
            console.log('error while uploading blog: ', error);
            showErrorToast('Somwething went wrong !!')
        }
    }

    useEffect(() => {
        handleAuthorData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-gray-2 shadow-xl rounded p-10">
                <h1 className='text-center text-3xl my-5'>Blog Details</h1>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="blogTitle">
                        Blog Title
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
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
                    <label className="block text-sm font-bold mb-2" htmlFor="metaTags">
                        Meta Tags (Separated by comma)
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="metaTags"
                        type="text"
                        placeholder="Enter meta tags"
                        value={metaTags.join(',')}
                        onChange={handleMetaTagsChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="blogDesc">
                        Blog Description
                    </label>
                    <textarea
                        className="textarea-ghost-secondary textarea shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="blogDesc"
                        placeholder="Enter blog description"
                        name="blogDesc"
                        value={desc}
                        onChange={(e) => { setDesc(e.target.value) }}
                        required
                    ></textarea>
                </div>
                <div className='grid grid-cols-2 gap-4' >
                    <div className="mb-4 space-x-4">
                        <label className="block my-auto  text-sm font-bold mb-2" htmlFor="titleImage">
                            Image URL
                        </label>
                        <input
                            className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="titleImage"
                            type="text"
                            placeholder="Enter image name"
                            name="titleImage"
                            value={img}
                            onChange={(e) => { setImg(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="mb-4 space-x-4">
                        <label className="block my-auto  text-sm font-bold mb-2" htmlFor="titleImage">
                            Aditional Blog URL
                        </label>
                        <input
                            className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            // id="titleImage"
                            type="text"
                            placeholder="Enter aditional url"
                            name="titleImage"
                            value={aditionalURL}
                            onChange={(e) => { setAditionalURL(e.target.value) }}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="writerName">
                        Writer's Name
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="writerName"
                        type="text"
                        placeholder="Enter writer's name"
                        name="writerName"
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        required
                    />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="domain">
                            Domain
                        </label>
                        <select
                            className="input-ghost-secondary bg-gray-2 input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="domain"
                            name="domain"
                            value={dom}
                            onChange={(e) => { setDom(e.target.value) }}
                            required
                        >
                            <option value="Random">Default</option>
                            <option value="Technology">Technology</option>
                            <option value="Digitial">Digitial Services</option>
                            <option value="Startup">Startup</option>
                            <option value="Innovation">Innovation</option>
                            <option value="Investment">Investment</option>
                            <option value="CA and Registration">CA and Registration Service</option>
                            {/* investment inovation */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2" htmlFor="domain">
                            Archive State
                        </label>
                        <select
                            className="input-ghost-secondary bg-gray-2 input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="archive"
                            name="archive"
                            value={archiveState}
                            onChange={(e) => { setArchiveState(e.target.value) }}
                            required
                        >
                            <option value="true">Archive</option>
                            <option value="false">Unarchive</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="metaTags">
                        Focus Keywords (Separated by comma)
                    </label>
                    <input
                        className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="metaTags"
                        type="text"
                        placeholder="Enter meta tags"
                        value={metaTags.join(',')} // Join the array of tags with comma to display in the input field
                        onChange={handleFocusKeywoerdsChange}
                    />
                </div>
            </div>
            <div className="max-w-5xl bg-gray-2 mx-auto px-10 py-4">
                {/* <div className="tabs mx-auto mb-6">
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
                </div> */}
                <div className="tab-content max-w-full ">
                    {/* {activeTab === 'editor' && ( */}
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
                    {/* )} */}
                    {/* {activeTab === 'text' && (
                        <div className="mt-4">
                            <div dangerouslySetInnerHTML={{ __html: htmlcontent }} />
                        </div>
                    )} */}
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
