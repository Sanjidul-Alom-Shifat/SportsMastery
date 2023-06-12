// import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const ManageUsers = () => {

    const [axiosSecure] = useAxiosSecure();
    // use query
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const response = await axiosSecure.get('/users');
        return response.data;
    });

    // for set the user admin
    const HandleMakeAdmin = (user) => {
        fetch(`https://summer-camp-server-xi-three.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: true,
                        confirmButtonText: 'Yes',
                        // timer: 1500
                    })
                }

            })
    };

    // for make a user an instructor
    const HandleMakeInstructor = (user) => {
        fetch(`https://summer-camp-server-xi-three.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: true,
                        confirmButtonText: 'Yes',
                        // timer: 1500
                    })
                }

            })
    };

    // to delete user
    const HandleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(response => {
                        console.log(response.data);
                        if (response.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div>

            <Helmet>
                <title>SportsMastery | Manage Users</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Manage <span className="text-teal-500">User&#39;s</span></h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-7 lg:mb-10 mx-2 lg:mx-6">
                <table className="w-full  overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Serial
                            </th>
                            <th scope="col" className="px-8 py-4">
                                Users Name
                            </th>

                            <th scope="col" className="px-6 py-4 text-center">
                                User Role
                            </th>

                            <th scope="col" className="px-8 py-4 text-center">
                                Make Admin
                            </th>
                            <th scope="col" className="px-8 py-4 text-center">
                                Make Instructor
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => (
                                <tr key={index} className="bg-white border-b font-semibold text-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4 text-center">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="flex items-center px-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {/* for user image and name and email */}
                                        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="Jese image" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{user?.name}</div>
                                            <div className="font-normal text-gray-500">{user?.email}</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}

                                        <button className="block rounded bg-gradient-to-r from-teal-200 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{user?.role}</button>

                                    </td>

                                    <td className="px-6 py-4">
                                        {
                                            user.role === 'admin'
                                                ?
                                                <button
                                                    disabled
                                                    className=" btn btn-accent w-full">
                                                    Admin
                                                </button>
                                                :
                                                <button
                                                    onClick={() => HandleMakeAdmin(user)}
                                                    className=" btn btn-accent w-full">
                                                    Make Admin
                                                </button>
                                        }

                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            user.role === 'instructor'
                                                ?
                                                <button
                                                    disabled
                                                    className="btn btn-accent w-full">
                                                    Instructor
                                                </button>
                                                :
                                                <button
                                                    disabled={user?.role === 'admin'}
                                                    onClick={() => HandleMakeInstructor(user)}
                                                    className="btn btn-accent w-full">
                                                    Make Instructor
                                                </button>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            disabled={user?.role === 'admin'}
                                            onClick={() => HandleDeleteUser(user)}
                                            className="btn btn-error w-full">
                                            Delete
                                        </button>
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

export default ManageUsers;