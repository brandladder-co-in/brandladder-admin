import React from 'react'
import { Link } from 'react-router-dom';

import useEmailAuth from '../../../hooks/auth/useEmailAuth';
import LogoutModal from '../../modal/logout-modal';
import Alert from '../../tosters/alert';

import { GrArticle } from "react-icons/gr";
import { FaRegFileExcel } from "react-icons/fa";
import { MdOutlineEmojiEvents, MdOutlineEventSeat } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoCodeSlash } from "react-icons/io5";
import UploadImgMOdal from '../../modal/uploadimg-modal';

const SidebarNavigation = ({ children }) => {

    const { currentUser } = useEmailAuth();

    return (
        <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
            <aside className="sidebar-sticky sidebar justify-start">
                <section className="sidebar-title items-center p-4 cursor-pointer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2Ffull-logo.png?alt=media&token=5a963339-c8d7-42f1-9b21-fc29358196e6" alt="" />
                </section>
                <section className="sidebar-content">
                    <nav className="menu rounded-md">
                        <section className="menu-section px-4">
                            <ul className="menu-items">

                                <li>
                                    <input type="checkbox" id="blog-menu" className="menu-toggle" />
                                    <label className="menu-item justify-between" htmlFor="blog-menu">
                                        <div className="flex gap-2">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg> */}
                                            <span>Articles Section</span>
                                        </div>

                                        <span className="menu-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </label>

                                    <div className="menu-item-collapse">
                                        <div className="min-h-0">
                                            <Link to='/dashboard/add-blogs' className='flex menu-item' >
                                                <FaRegFileExcel className='my-auto mx-2' />
                                                <span>Add New Article</span>
                                            </Link>
                                            <Link to='/dashboard/blogs' className='flex menu-item' >
                                                <GrArticle className='my-auto mx-2' />
                                                <span>All Blogs</span>
                                            </Link>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <input type="checkbox" id="events-menu" className="menu-toggle" />
                                    <label className="menu-item justify-between" htmlFor="events-menu">
                                        <div className="flex gap-2">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg> */}
                                            <span>Events Section</span>
                                        </div>

                                        <span className="menu-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </label>

                                    <div className="menu-item-collapse">
                                        <div className="min-h-0">
                                            <Link to='/dashboard/add-events' className='flex menu-item' >
                                                <MdOutlineEmojiEvents className='my-auto mx-2' />
                                                <span>Add New Event</span>
                                            </Link>
                                            <Link to='/dashboard/all-events' className='flex menu-item' >
                                                <MdOutlineEventSeat className='my-auto mx-2' />
                                                <span>All Events</span>
                                            </Link>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <input type="checkbox" id="client-menu" className="menu-toggle" />
                                    <label className="menu-item justify-between" htmlFor="client-menu">
                                        <div className="flex gap-2">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg> */}
                                            <span>Clients Details</span>
                                        </div>

                                        <span className="menu-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </label>

                                    <div className="menu-item-collapse">
                                        <div className="min-h-0">
                                            <Link to='/dashboard/add-client' className='flex menu-item' >
                                                <MdOutlineEmojiEvents className='my-auto mx-2' />
                                                <span>Add New Client</span>
                                            </Link>
                                            <Link to='/dashboard/all-clients' className='flex menu-item' >
                                                <MdOutlineEventSeat className='my-auto mx-2' />
                                                <span>All Clients</span>
                                            </Link>
                                        </div>
                                    </div>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/create-user' className='flex' >
                                        <RxAvatar className='my-auto mr-2' />
                                        <span>Create New Admins</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <label className='flex' htmlFor='img-upload-modal' >
                                        <IoCodeSlash className='my-auto mr-2' />
                                        <span>Image to URL</span>
                                    </label>
                                </li>
                            </ul>
                        </section>
                    </nav>
                </section>
                <section className="sidebar-footer bg-gray-2 pt-2">
                    <div className="divider my-0"></div>
                    {/* <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4"> */}
                    <label className="whites mx-2 flex h-fit w-full cursor-pointer" tabIndex="0">
                        <label
                            className='btn btn-outline-error my-2 w-4/5 text-center mx-auto'
                            htmlFor='logout-modal'
                        >
                            LogOut
                        </label>
                    </label>
                </section>
            </aside>
            <div className="px-2 py-5 w-full h-full">
                <div className="mb-4">
                    <Alert user={currentUser?.email} />
                </div>
                {children}
            </div>
            <UploadImgMOdal />
            <LogoutModal />
        </div>
    )
}

export default SidebarNavigation
