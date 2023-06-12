import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../../Provider/AuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useSelectedClasses from '../../../../Hooks/useSelectedClasses';

const SeletedClasses = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [selectClasses, refetch] = useSelectedClasses();
    console.log(selectClasses)

    const HandleDeleteClass = (classItem) => {
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
                axiosSecure.delete(`/selectedClasses/${classItem._id}`)
                    .then((response) => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    };

    return (

        <div>

            <Helmet>
                <title>SportsMastery | Selected Classes</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">My Seleted <span className="text-teal-500">Classe&#39;s</span></h1>

            <h1 className='text-lg mt-5 font-semibold mb-7 lg:text-xl mx-2 lg:mx-5'>Student Name : <span className="text-teal-500">{user.displayName}</span></h1>

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
                                Student Email
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Instructor Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Payment
                            </th>

                            <th scope="col" className="px-10 py-4 text-center">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectClasses?.map((sclass, index) => (
                                <tr key={index} className="bg-white border-b font-semibold  text-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4 text-center">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="flex mt-2 -ml-4 mr-5 items-center  px-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {/* for user image and name and email */}
                                        <img className="w-10 h-10 rounded-full" src={sclass?.image} alt="Jese image" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{sclass?.className}</div>
                                            <div className="font-normal text-gray-500">SportsMastery</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.studentEmail}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.instructorName}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">${sclass?.price}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for enrol */}
                                        <Link to={`/dashboard/payment/${sclass.selectClassId}`}>
                                            <button
                                                className=" btn btn-outline btn-success w-full"
                                            >
                                                Payment
                                            </button>
                                        </Link>
                                    </td>


                                    <td className="px-6 py-4">

                                        <button
                                            onClick={() => HandleDeleteClass(sclass)}
                                            className=" btn btn-outline btn-error w-full"
                                        >
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

export default SeletedClasses;