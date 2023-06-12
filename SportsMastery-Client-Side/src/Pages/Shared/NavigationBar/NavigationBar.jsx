import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { AuthContext } from '../../../Provider/AuthProvider';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const NavigationBar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, LogOutUser } = useContext(AuthContext);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const handlelogout = () => {
        LogOutUser()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User log out successfully.',
                    showConfirmButton: true,
                    // timer: 1500
                });
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            })
    }


    return (
        <div className=' py-5 mx-auto sm:max-w-full md:max-w-full bg-teal-50 lg:max-w-full md:px-24 lg:px-8'>

            <div className='relative flex items-center justify-around'>
                <Link
                    to='/'
                    aria-label='SportsMastery'
                    title='SportsMastery'
                    className='inline-flex items-center'
                >
                    <div className='flex items-center justify-center  rounded-full '>
                        <img src={logo} alt="" className='w-10 h-10  rounded-full' />
                    </div>

                    <span className='ml-3 text-xl font-bold tracking-wide text-gray-800 '>
                        SportsMastery
                    </span>
                </Link>

                <ul className='items-center hidden text-xl font-bold space-x-10 lg:flex'>

                    <li className=''>
                        <NavLink
                            to='/'
                            aria-label='Home'
                            title='Home'
                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                        >
                            Home
                        </NavLink>
                    </li>

                    <li className=''>
                        <NavLink
                            to='/instructors'
                            aria-label='Instructors'
                            title='Instructors'
                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                        >
                            Instructors
                        </NavLink>
                    </li>

                    <li className=''>
                        <NavLink
                            to='/classes'
                            aria-label='Classes'
                            title='Classes'
                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                        >
                            Classes
                        </NavLink>
                    </li>

                    {
                        user &&
                        <li className=''>
                            <NavLink
                                to='/dashboard/home'
                                aria-label='Dashboard'
                                title='Dashboard'
                                className={({ isActive }) => (isActive ? 'active' : 'default')}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                    }

                    <li className=''>
                        <NavLink
                            to='/about'
                            aria-label='About'
                            title='About'
                            className={({ isActive }) => (isActive ? 'active' : 'default')}
                        >
                            About
                        </NavLink>
                    </li>



                </ul>

                <div className='hidden space-x-8 lg:flex items-center'>
                    {
                        user &&
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user?.photoURL}
                                    alt=""
                                    title={user?.displayName}
                                    className="avatar-img"
                                />
                            </div>
                        </label>
                    }
                    {
                        user ?
                            <button onClick={handlelogout} className="bg-gradient-to-r from-teal-400 to-teal-200 text-lg rounded-full px-4 py-2 text-black font-semibold  ">
                                Log Out
                            </button>
                            :
                            <Link to='/login'>
                                <button className="bg-gradient-to-r from-teal-400 to-teal-200 text-lg rounded-full px-4 py-2 text-black font-semibold">
                                    Login
                                </button>
                            </Link>
                    }
                    {
                        <label className="swap swap-rotate  ml-2">
                            <input
                                type="checkbox"
                                checked={theme === "light" ? false : true}
                                onChange={handleToggle} />

                            <svg
                                className="swap-on fill-current  w-6 h-6 lg:w-10 lg:h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            <svg
                                className="swap-off fill-current w-6 h-6 lg:w-10 lg:h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    }
                </div>
                <div className='lg:hidden'>
                    <button
                        aria-label='Open Menu'
                        title='Open Menu'
                        className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                            <path
                                fill='currentColor'
                                d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
                            />
                            <path
                                fill='currentColor'
                                d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
                            />
                            <path
                                fill='currentColor'
                                d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className='absolute z-10 top-0 left-0 w-full '>
                            <div className='p-5 bg-white border rounded shadow-sm'>
                                <div className='flex items-center justify-between mb-4'>
                                    <div>
                                        <Link
                                            to='/'
                                            aria-label='SportsMastery'
                                            title='SportsMastery'
                                            className='inline-flex items-center'
                                        >
                                            <div className='flex items-center justify-center w-10 h-10 rounded-full'>
                                                <img src={logo} alt="" className='w-10 h-10 rounded-full' />
                                            </div>
                                            <span className='ml-3 text-xl font-bold  tracking-wide text-gray-800 '>
                                                SportsMastery
                                            </span>
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            aria-label='Close Menu'
                                            title='Close Menu'
                                            className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                                                <path
                                                    fill='currentColor'
                                                    d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className='space-y-4 mt-3'>
                                        <li>
                                            <NavLink
                                                to='/'
                                                onClick={() => setIsMenuOpen(false)}
                                                aria-label='Home'
                                                title='Home'
                                                className='font-medium duration-200 text-lg tracking-wide text-gray-700 transition-colors hover:text-deep-purple-accent-400'
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/instructors'
                                                onClick={() => setIsMenuOpen(false)}
                                                aria-label='Instructors'
                                                title='Instructors'
                                                className='font-medium text-lg tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                            >
                                                Instructors
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to='/classes'
                                                onClick={() => setIsMenuOpen(false)}
                                                aria-label='Classes'
                                                title='Classes'
                                                className='font-medium text-lg tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                            >
                                                Classes
                                            </NavLink>
                                        </li>

                                        {
                                            user &&
                                            <li>
                                                <NavLink
                                                    to='/dashboard/home'
                                                    onClick={() => setIsMenuOpen(false)}
                                                    aria-label='Dashboard'
                                                    title='Dashboard'
                                                    className='font-medium text-lg tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                        }

                                        <li>
                                            <NavLink
                                                to='/about'
                                                onClick={() => setIsMenuOpen(false)}
                                                aria-label='About'
                                                title='About'
                                                className='font-medium text-lg tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                                            >
                                                About
                                            </NavLink>
                                        </li>

                                        <li>
                                            <label className="swap swap-rotate  ml-2">
                                                <input
                                                    type="checkbox"
                                                    checked={theme === "light" ? false : true}
                                                    onChange={handleToggle} />

                                                <svg
                                                    className="swap-on fill-current  w-6 h-6 lg:w-10 lg:h-10"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                                </svg>

                                                <svg
                                                    className="swap-off fill-current w-6 h-6 lg:w-10 lg:h-10"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                                </svg>
                                            </label>
                                        </li>


                                        <li>
                                            {
                                                user &&
                                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img src={user?.photoURL} title={user?.displayName} />
                                                    </div>
                                                </label>
                                            }
                                        </li>


                                        <li>
                                            {
                                                user ?
                                                    <button onClick={handlelogout} className="bg-gradient-to-r from-teal-400 to-teal-200 text-lg rounded-full px-4 py-2 text-black font-semibold">
                                                        Log Out
                                                    </button>
                                                    :
                                                    <Link to='/login'>
                                                        <button
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="bg-gradient-to-r from-teal-400 to-teal-200 text-lg rounded-full px-4 py-2 text-black font-semibold"
                                                        >
                                                            Login
                                                        </button>
                                                    </Link>

                                            }
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;