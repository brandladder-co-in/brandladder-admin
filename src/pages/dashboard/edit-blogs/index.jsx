import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../../context/FirestoreContext'
// import Loader from '../../../components/loader'
import DashBoard from '../../../components/frames/dashboard';
import BlogCard from '../../../components/cards/blog/BlogCard';

const EeditBlogs = () => {

    const [activeTab, setActiveTab] = useState('all');
    const [blogData, setBlogData] = useState();
    const [loading, setLoading] = useState(false);

    const { getAllDocsAndFields } = useFirestore()

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchBlogsData = async () => {
            setLoading(true)
            try {
                const res = await getAllDocsAndFields('blogs')
                setBlogData(res)
            } catch (error) {
                console.error('Error while feteching blog data: ', error);
            } finally {
                setLoading(false)
            }
        }

        fetchBlogsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const techBlogs = blogData?.filter(data => data.domain === 'tech_services');
    const digitalBlogs = blogData?.filter(data => data.domain === 'digital_services');
    const CABlogs = blogData?.filter(data => data.domain === 'ca_services');

    return (
        <DashBoard>
            <div className="bg-gray-2 mx-auto px-10 py-4">
                <div className="tabs mx-auto mb-6">
                    <div className="tabs tabs-boxed space-x-2">
                        <input type="radio" id="tab-13" name="tab-5" className="tab-toggle" defaultChecked />
                        <label htmlFor="tab-13" className="tab" onClick={() => handleTabChange('all')}>
                            All
                        </label>

                        <input type="radio" id="tab-14" name="tab-5" className="tab-toggle" />
                        <label htmlFor="tab-14" className="tab" onClick={() => handleTabChange('tech')}>
                            Technical Services
                        </label>

                        <input type="radio" id="tab-15" name="tab-5" className="tab-toggle" />
                        <label htmlFor="tab-15" className="tab" onClick={() => handleTabChange('digital')}>
                            Digital Services
                        </label>

                        <input type="radio" id="tab-16" name="tab-5" className="tab-toggle" />
                        <label htmlFor="tab-16" className="tab" onClick={() => handleTabChange('ca')}>
                            CA And Registration
                        </label>
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === 'all' && (
                        blogData && [...blogData].reverse().map((data) => {
                            return (

                                loading ? (
                                    <div className="skeleton-pulse h-24"></div>
                                ) : (
                                    <BlogCard
                                        key={data.id}
                                        id={data.id}
                                        title={data.blogTitle}
                                        metaTags={data.metaTags}
                                        desc={data.blogDesc}
                                        domain={data.domain}
                                        img={data.titleImage}
                                        author={data.writerName}
                                        content={data.blogContent}
                                    />
                                )

                            )
                        })
                    )}
                    {activeTab === 'tech' && (

                        loading ? (
                            <div className="skeleton-pulse h-24"></div>
                        ) : (
                            techBlogs && [...techBlogs].reverse().map((data) => {
                                return (
                                    <BlogCard
                                        key={data.id}
                                        title={data.blogTitle}
                                        desc={data.blogDesc}
                                        domain={data.domain}
                                        img={data.titleImage}
                                        author={data.writerName}
                                        content={data.blogContent}
                                    />
                                )
                            })
                        )
                    )}
                    {activeTab === 'digital' && (
                        digitalBlogs && [...digitalBlogs].reverse().map((data) => {
                            return (
                                <BlogCard
                                    key={data.id}
                                    title={data.blogTitle}
                                    desc={data.blogDesc}
                                    domain={data.domain}
                                    img={data.titleImage}
                                    author={data.writerName}
                                    content={data.blogContent}
                                />
                            )
                        })
                    )}
                    {activeTab === 'ca' && (
                        CABlogs && [...CABlogs].reverse().map((data) => {
                            return (
                                <BlogCard
                                    key={data.id}
                                    title={data.blogTitle}
                                    desc={data.blogDesc}
                                    domain={data.domain}
                                    img={data.titleImage}
                                    author={data.writerName}
                                    content={data.blogContent}
                                />
                            )
                        })
                    )}
                </div>
            </div>
        </DashBoard>
    )
}

export default EeditBlogs
