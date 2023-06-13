import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const PaymentHistory = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: payments = [], refetch } = useQuery({
        queryKey: ["paymenthistory"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentSuccessfull/${user?.email}`);
            return res.data
        }
    })

    console.log(payments);

    return (
        <div>

            <Helmet>
                <title>SportsMastery | Payment History</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white"><span className="text-teal-500">Payment</span> History </h1>

            <h1 className='text-lg mt-5 font-semibold mb-7 lg:text-xl mx-2 lg:mx-5'>Student Name : <span className="text-teal-500">{user.displayName}</span></h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-7 lg:mb-10 mx-2 lg:mx-5">
                <table className="w-full  overflow-x-auto text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Serial
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Student Name
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Student Email
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Class Name
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-10 py-4 text-center">
                                Payment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((sclass, index) => (
                                <tr key={index} className="bg-white border-b font-semibold  text-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4 text-center">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="flex items-center mt-2 -ml-4 mr-4  px-8 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        {/* for user image and name and email */}
                                        <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="Jese image" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{user?.displayName}</div>
                                            <div className="font-normal text-gray-500">SportsMastery</div>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.email}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.enrolledClassName}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">{sclass?.date}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for toy price */}
                                        <button className="block rounded bg-gradient-to-r from-teal-100 to-amber-100 w-full px-3 py-3 text-sm font-mono text-black shadow">${sclass?.price}</button>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        {/* for enrol */}
                                        <button className="block rounded bg-gradient-to-r from-emerald-300 to-emerald-100 w-full px-3 py-3 text-sm font-mono text-black shadow">
                                            Successful
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

export default PaymentHistory;