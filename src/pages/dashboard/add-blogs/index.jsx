import React from 'react';
import DashBoard from '../../../components/frames/dashboard';
import BlogDtls from '../../../components/forms/add-blogs/blog-dtls';

const AddBlogs = () => {

    return (
        <DashBoard>
            <section className="pb-8 pt-4">
                <BlogDtls />
            </section>
        </DashBoard>
    );
};

export default AddBlogs;
