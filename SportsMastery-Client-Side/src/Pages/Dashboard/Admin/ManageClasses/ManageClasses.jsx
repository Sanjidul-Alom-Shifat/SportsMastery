import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
import useClasses from "../../../../Hooks/useClasses";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageClasses = () => {

    const [classes, refetch] = useClasses();
    const [axiosSecure] = useAxiosSecure();

    const handleApprove = async (id) => {
        // setButtonDisabled(true); // Disable buttons
        const res = await axiosSecure.patch(`/classes/approve/${id}`);
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Class approved successfully.',
                showConfirmButton: true,
                // timer: 1500
            });
        }
    };


    const handleDeny = async (id) => {
        // setButtonDisabled(true); // Disable buttons
        const res = await axiosSecure.patch(`/classes/deny/${id}`);
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Class has been denied.',
                showConfirmButton: true,
                // timer: 1500
            });
        }
    };



    return (
        <div>

            <Helmet>
                <title>SportsMastery | Manage Classes</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Manage <span className="text-teal-500">Classe&#39;s</span></h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-7 lg:mb-10 mx-2 lg:mx-5">
                <table className="w-full  overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Serial
                            </th>
                            <th scope="col" className="px-10 py-4">
                                Class Name
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Instructor Name
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Instructor Email
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Available Seats
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Approve
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Deny
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Feedback
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes?.map((sclass, index) => (
                                <tr key={index} className="bg-white border-b font-semibold  text-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4 text-center">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="flex items-center  px-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {/* for user image and name and email */}
                                        <img className="w-10 h-10 rounded-full" src={sclass?.image} alt="Jese image" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{sclass?.className}</div>
                                            <div className="font-normal text-gray-500">SportsMastery</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.instructorName}</button>

                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.instructorEmail}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.availableSeats}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">${sclass?.price}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for status */}
                                        {sclass.status === 'pending' && (
                                            <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">
                                                {sclass.status}
                                            </button>
                                        )}
                                        {sclass.status === 'approved' && (
                                            <button className="block rounded bg-gradient-to-r from-emerald-300 to-emerald-100 w-full px-3 py-3 text-sm font-mono text-black shadow">
                                                {sclass.status}
                                            </button>
                                        )}
                                        {sclass.status === 'denied' && (
                                            <button className="block rounded bg-gradient-to-r from-red-400 to-red-200 w-full px-3 py-3 text-sm font-mono text-black shadow">
                                                {sclass.status}
                                            </button>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for approve */}
                                        <button
                                            onClick={() => handleApprove(sclass._id)}
                                            className=" btn btn-accent w-full"
                                            disabled={sclass?.status === 'approved' || sclass?.status === 'denied'}
                                        >
                                            Approve
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for approve */}
                                        <button
                                            onClick={() => handleDeny(sclass._id)}
                                            className=" btn btn-error w-full"
                                            disabled={sclass?.status === 'approved' || sclass?.status === 'denied'}
                                        >
                                            Deny
                                        </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/dashboard/feedback/${sclass._id}`}>
                                            <button
                                                className=" btn btn-outline btn-success w-full">
                                                Feedback
                                            </button>
                                        </Link>
                                    </td>

                                </tr>

                            ))
                        }
                    </tbody>
                </table>

            </div>

        </div>
    );
};

export default ManageClasses;


// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import React from "react";

 // const [axiosSecure] = useAxiosSecure();
    // const { data: classes = [], refetch } = useQuery(['classes'], async () => {
    //     const res = await axiosSecure.get('/classes')
    //     return res.data;
    // })