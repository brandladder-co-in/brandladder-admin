import React, { useState, useEffect } from 'react';
import DashBoard from '../../../components/frames/dashboard';

import { useFirestore } from '../../../context/FirestoreContext'

const EeditBlogs = () => {

    const [blogData, setBlogData] = useState();

    const { getAllDocsAndFields } = useFirestore()

    useEffect(() => {
        const fetchBlogsData = async () => {
            try {
                const res = await getAllDocsAndFields('blogs')
                console.log(res)
                setBlogData(res)
            } catch (error) {
                console.error('Error while feteching blog data: ', error);
            }
        }

        fetchBlogsData()
    }, [])
    console.log(blogData)
    return (
        <DashBoard>
            EeditBlogs
        </DashBoard>
    )
}

export default EeditBlogs
