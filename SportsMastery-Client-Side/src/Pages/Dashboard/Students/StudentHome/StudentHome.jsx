import  { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../Provider/AuthProvider';

const StudentHome = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='mx-3'>
            <Helmet>
                <title>SportsMastery | Student Dashboard</title>
            </Helmet>

            <h1 className="text-xl mt-5 lg:mt-8 mb-7 lg:mb-12 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Welcome to <span className="text-teal-500">Student Dashboard</span> </h1>

            <div>
                <div className="max-w-lg mx-auto my-10 bg-white shadow-xl rounded-lg  p-5">
                    <img className="w-40 h-40 rounded-full mx-auto" src={user?.photoURL} alt="Profile picture" />
                    <h2 className="text-center text-2xl font-semibold font-mono mt-3">{user?.displayName}</h2>
                    <p className="text-center text-gray-600 mt-1 font-mono">SportsMastery</p>
                    <div className="flex justify-center mt-5">
                        <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">Twitter</a>
                        <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">LinkedIn</a>
                        <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">GitHub</a>
                    </div>
                    <div className="mt-5 mb-5">
                        <h3 className="text-xl font-mono font-semibold">Bio</h3>
                        <p className="text-gray-600 font-mono mt-2">Passionate about sports and eager to learn from the best. Striving to improve skills, gain knowledge, and reach new heights in the sporting world. Ready to embrace challenges, push boundaries, and become a true sports champion.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default StudentHome;