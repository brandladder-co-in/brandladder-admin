import React from 'react'
import { Link } from 'react-router-dom';

import LogoutModal from '../../modal/logout-modal';
import Alert from '../../tosters/alert';

import { CiDatabase, CiHome } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";

const SidebarNavigation = ({ children }) => {

    return (
        <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
            <aside className="sidebar-sticky sidebar justify-start">
                <section className="sidebar-title items-center p-4 cursor-pointer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2Ffull-logo.png?alt=media&token=5a963339-c8d7-42f1-9b21-fc29358196e6" alt="" />
                </section>
                <section className="sidebar-content">
                    <nav className="menu rounded-md">
                        <section className="menu-section px-4">
                            <span className="menu-title">Main menu</span>
                            <ul className="menu-items">
                                <li className="menu-item">
                                    <Link to='/dashboard' className='flex' >
                                        <CiHome className='my-auto mx-2' />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/add-blogs' className='flex' >
                                        <FaRegFileExcel className='my-auto mx-2' />
                                        <span>Add New Article</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/blogs' className='flex' >
                                        <CiDatabase className='my-auto mx-2' />
                                        <span>All Blogs</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/create-admin' className='flex' >
                                        <CiDatabase className='my-auto mx-2' />
                                        <span>Create New Admins</span>
                                    </Link>
                                </li>

                                {/* <li className="menu-item">
                                    <Link to='/dashboard/question-bank' className='flex' >
                                        <CiDatabase className='my-auto mx-2' />
                                        <span>Question Bank</span>
                                    </Link>
                                </li> */}
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
                    <Alert />
                </div>
                {children}
            </div>
            <LogoutModal />
        </div>
    )
}

export default SidebarNavigation