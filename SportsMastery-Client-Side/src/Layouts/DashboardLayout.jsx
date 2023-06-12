import { useState } from 'react';
import logo from '../assets/logo.webp';
import { FaHome, FaUsers, FaBookReader, FaChalkboardTeacher, FaTv, FaWindowClose, FaClone, FaClipboardCheck, FaWallet } from "react-icons/fa";
// import { HiAnnotation } from "react-icons/hi";
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import { motion } from 'framer-motion';

const DashboardLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseDashboard = () => {
        // Logic to close the dashboard goes here
        setSidebarOpen(false);
    };

    return (
        <>

            <button onClick={handleToggleSidebar} data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="separator-sidebar "
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4  overflow-y-auto bg-gray-50 dark:bg-gray-800">

                    <ul className="space-y-2 font-medium  border-gray-200 dark:border-gray-700">
                        <motion.li
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='mb-3'
                        >
                            <a href="#" className="flex items-center  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <img src={logo} alt="" className='w-9 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                <span className="ml-3 ">SPORTSMASTERY</span>
                            </a>
                        </motion.li>

                        {
                            isAdmin ?
                                (<>
                                    <motion.li
                                        onClick={handleCloseDashboard}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* TODO */}
                                        <NavLink to='/dashboard/adminHome'>
                                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <FaHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaHome>
                                                <span className="ml-3">Admin Home</span>
                                            </a>
                                        </NavLink>
                                    </motion.li>
                                    <motion.li
                                        onClick={handleCloseDashboard}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink to='/dashboard/manageClasses'>
                                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                                <FaBookReader className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaBookReader>
                                                <span className="flex-1 ml-3 whitespace-nowrap">Manage Classes</span>
                                            </a>
                                        </NavLink>
                                    </motion.li>
                                    <motion.li
                                        onClick={handleCloseDashboard}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink to='/dashboard/manageUsers'>
                                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <FaUsers className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaUsers>
                                                <span className="flex-1 ml-3 whitespace-nowrap">Manage Users</span>
                                            </a>
                                        </NavLink>
                                    </motion.li>
                                </>)
                                :
                                isInstructor ?
                                    (<>
                                        <motion.li
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCloseDashboard}>
                                            {/* TODO */}
                                            <NavLink to='/dashboard/instructorHome'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <FaHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaHome>
                                                    <span className="ml-3">Instructor Home</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>
                                        <motion.li
                                            onClick={handleCloseDashboard}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to='/dashboard/addClass'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                                    <FaBookReader className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaBookReader>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Add a Class</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>
                                        <motion.li
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleCloseDashboard}
                                        >
                                            <NavLink to='/dashboard/myClasses'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <FaClone className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaClone>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">My Classes</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>
                                    </>)
                                    :
                                    (<>
                                        <motion.li
                                            onClick={handleCloseDashboard}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {/* TODO */}
                                            <NavLink to='/dashboard/studentHome'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <FaHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaHome>
                                                    <span className="ml-3">Student Home</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>

                                        <motion.li
                                            onClick={handleCloseDashboard}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to='/dashboard/selectedClasses'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ">
                                                    <FaClipboardCheck className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaClipboardCheck>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">My Selected Classes</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>

                                        <motion.li
                                            onClick={handleCloseDashboard}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to='/dashboard/enrolledClasses'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <FaClone className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaClone>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">My Enrolled Classes</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>

                                        <motion.li
                                            onClick={handleCloseDashboard}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <NavLink to='/dashboard/paymentHistory'>
                                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                    <FaWallet className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaWallet>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">Payment History</span>
                                                </a>
                                            </NavLink>
                                        </motion.li>

                                    </>)
                        }

                    </ul>

                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <motion.li
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCloseDashboard}
                        >
                            <NavLink to='/'>
                                <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <FaHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400"></FaHome>
                                    <span className="ml-3">Home</span>
                                </a>
                            </NavLink>
                        </motion.li>
                        <motion.li
                            onClick={handleCloseDashboard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink to='/instructors'>
                                <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <FaChalkboardTeacher className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaChalkboardTeacher>
                                    <span className="ml-3">Instructors</span>
                                </a>
                            </NavLink>
                        </motion.li>

                        <motion.li
                            onClick={handleCloseDashboard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink to='/classes'>
                                <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                    <FaTv className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaTv>
                                    <span className="ml-3">Classes</span>
                                </a>
                            </NavLink>
                        </motion.li>

                        <motion.li
                            onClick={handleCloseDashboard}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="#" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                <FaWindowClose className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaWindowClose>
                                <span className="ml-3">Close</span>
                            </a>
                        </motion.li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">

                    <Outlet></Outlet>

                </div>
            </div>

        </>
    );
};

export default DashboardLayout;