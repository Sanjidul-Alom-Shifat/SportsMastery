import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBaseballBall, FaBasketballBall, FaChalkboardTeacher, FaChess, FaFootballBall, FaHockeyPuck, FaPeopleCarry, FaProductHunt, FaShippingFast, FaUserGraduate, FaUserSecret, FaVolleyballBall, FaWallet } from 'react-icons/fa';

const DashboardHome = () => {
    return (
        <div className='mx-4 mt-5'>

            <Helmet>
                <title>SportsMastery | Dashboard Home Page</title>
            </Helmet>

            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800 capitalize lg:text-3xl dark:text-white">Welcome To <span className="text-teal-500">Dashboard</span></h1>


            <div
                className=" mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:mt-8 mb-5 "
            >
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md p-6">
                    <FaUserSecret className="w-9 h-9 text-white"></FaUserSecret>
                    <div className="">
                        <p className="text-white font-mono text-2xl">
                            <span id="deposit-total">Admin</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r   from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md p-6">
                    <FaChalkboardTeacher className="w-9 h-9 text-white"></FaChalkboardTeacher>
                    <div className="">
                        <p className="text-white font-mono text-2xl">
                            <span id="deposit-total">Instructors</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md p-6">
                    <FaUserGraduate className="w-9 h-9 text-white"></FaUserGraduate>
                    <div className="">
                        <p className="text-white text-2xl">
                            <span id="deposit-total">Students</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>

            </div>

            <h1 className="text-xl font-semibold text-left mb-6 text-gray-800 capitalize mt-10 lg:text-2xl dark:text-white">Review Top <span className="text-teal-500">Training Classes : </span></h1>

            <div
                className=" mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 lg:mt-10 mb-8 "
            >
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaBasketballBall className="w-9 h-9 text-white"></FaBasketballBall>
                    <div className="">
                        <p className="text-white font-mono text-2xl">
                            <span id="deposit-total">Basketball</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r   from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaVolleyballBall className="w-9 h-9 text-white"></FaVolleyballBall>
                    <div className="">
                        <p className="text-white font-mono text-2xl">
                            <span id="deposit-total">Volleyball </span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaChess className="w-9 h-9 text-white"></FaChess>
                    <div className="">
                        <p className="text-white text-2xl">
                            <span id="deposit-total">Chess</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaBaseballBall className="w-9 h-9 text-white"></FaBaseballBall>
                    <div className="">
                        <p className="text-white text-2xl">
                            <span id="deposit-total">Cricket</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaFootballBall className="w-9 h-9 text-white"></FaFootballBall>
                    <div className="">
                        <p className="text-white text-2xl">
                            <span id="deposit-total">Football</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>
                <div className=" flex items-center gap-7 justify-center  bg-gradient-to-r  from-teal-400 via-fuchsia-400 to-fuchsia-200 font-semibold rounded-lg shadow-md px-6 py-8">
                    <FaHockeyPuck className="w-9 h-9 text-white"></FaHockeyPuck>
                    <div className="">
                        <p className="text-white text-2xl">
                            <span id="deposit-total">Hockey</span>
                        </p>
                        <h3 className="text-xl font-semibold text-white">SportsMastery</h3>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DashboardHome;