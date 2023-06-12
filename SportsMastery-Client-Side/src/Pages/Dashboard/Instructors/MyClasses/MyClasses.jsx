import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const MyClasses = () => {

    // const [classes] = useClasses();
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: myclasses = [], refetch } = useQuery({
        queryKey: ["approvedClass"],
        queryFn: async () => {
            const res = await axiosSecure(`/classes?email=${user.email}`);
            return res.data
        }
    })

    console.log(myclasses)


    return (
        <div>

            <Helmet>
                <title>SportsMastery | My Classes</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">My <span className="text-teal-500">Classe&#39;s</span></h1>

            <h1 className='text-lg mt-5 font-semibold mb-7 lg:text-xl mx-2 lg:mx-5'>Instructor Name : <span className="text-teal-500">{user.displayName}</span></h1>

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
                                Available Seats
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Status
                            </th>

                            <th scope="col" className="px-10 py-4 text-center">
                                Total Enrolled
                            </th>

                            <th scope="col" className="px-10 py-4 text-center">
                                Feedback
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myclasses?.map((sclass, index) => (
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
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.availableSeats}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">${sclass?.price}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
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
                                        {/* for enrol */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.enrolled}</button>
                                    </td>


                                    <td className="px-6 py-4">


                                        <button
                                            disabled={sclass?.status === 'pending' || sclass?.status === 'approved'}
                                            className=" btn btn-outline btn-success w-full"
                                        >
                                            <Link to={`/dashboard/seeFeedback/${sclass._id}`}>
                                                Feedback
                                            </Link>
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

export default MyClasses;