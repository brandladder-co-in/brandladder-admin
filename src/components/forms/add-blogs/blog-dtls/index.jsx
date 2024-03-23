import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom'
import useEmailAuth from '../../../../hooks/auth/useEmailAuth';
import { useFirestore } from '../../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../tosters/natifications'

const BlogDtls = () => {

    const [authorData, setAuthorData] = useState()
    const [title, setTitle] = useState('');
    const [metaTags, setMetaTags] = useState([]);
    const [focusKeywords, setFocusKeywords] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [author, setAuthor] = useState('');
    const [dom, setDom] = useState('Default');
    const [aditionalURL, setAditionalURL] = useState('');
    const [htmlcontent, setHtmlContent] = useState('');
    const [archiveState, setArchiveState] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const { storeData: uploadBlog, getDocumentData: getAuthorData } = useFirestore()
    const navigate = useNavigate();
    const { currentUser } = useEmailAuth();
    const editor = useRef(null);

    const handleMetaTagsChange = (e) => {
        const tags = e.target.value.split(',');
        setMetaTags(tags);
    };

    const blogData = {
        blogTitle: title,
        metaTags: metaTags,
        focusKeywoerds: focusKeywords,
        blogDesc: desc,
        titleImage: img,
        writerName: author,
        writerEmail: currentUser ? currentUser.email : 'ritwik',
        domain: dom,
        date: new Date().toISOString(),
        blogContent: htmlcontent,
        archive: archiveState,
        aditionalURL: aditionalURL,
        authorData: authorData,
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
        setFocusKeywords('')
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

        setIsLoading(true)
        try {
            // const currentDate = new Date().toISOString()

            if (title !== '' && desc !== '' && img !== '' && author !== '' && dom !== '' && htmlcontent !== '') {
                await uploadBlog('blogs', title, blogData)
                // console.log(blogData)
                showSuccessToast('Blog Uploadeed Successfully !!')
                handleInputAfterSubmit()
                navigate('/dashboard/blogs')
            }

        } catch (error) {
            console.log('error while uploading blog: ', error);
            showErrorToast('Somwething went wrong !!')
        } finally {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        handleAuthorData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="max-w-5xl mx-auto">
            {
                authorData ? (
                    <>
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
                                        <option value={true}>Archive</option>
                                        <option value={false}>Unarchive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="focusKeywords">
                                    Focus Keywords (Separated by comma)
                                </label>
                                <input
                                    className="input-ghost-secondary input shadow max-w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="focusKeywords"
                                    type="text"
                                    placeholder="Enter meta tags"
                                    value={focusKeywords}
                                    onChange={(e) => { setFocusKeywords(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="max-w-5xl bg-gray-2 mx-auto px-10 py-4">
                            <div className="tab-content max-w-full ">
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
                            </div>
                            {
                                isLoading ? (
                                    <button
                                        className='btn btn-outline-secondary w-full mx-auto text-center mt-10'>
                                        Loading ...
                                    </button>
                                ) : (
                                    <button
                                        className='btn btn-outline-secondary w-full mx-auto text-center mt-10'
                                        onClick={handleSubmit}>
                                        Add Blog
                                    </button>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <h1 className='text-3xl'>Please wait a few seconds. If the page does not load, please refresh or log in again.</h1>
                )
            }
        </div>
    )
}

export default BlogDtls;
