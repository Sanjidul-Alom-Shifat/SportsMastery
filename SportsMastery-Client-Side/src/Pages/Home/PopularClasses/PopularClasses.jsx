import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const PopularClasses = () => {

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const [axiosSecure] = useAxiosSecure();
    const { data: topClasses = [], refetch } = useQuery({
        queryKey: ["topClasses"],
        queryFn: async () => {
            const res = await axiosSecure('/topClasses');
            return res.data
        }
    })

    console.log(topClasses)

    return (

        <div data-aos='zoom-in' className='lg:mx-12 mt-6 lg:mt-7 mb-12'>

            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">review our    <br /> Popular <span className="text-teal-500">Top Classe&#39;s</span></h1>

            <div className="grid grid-cols-1 mx-4 lg:mt-12 mt-7 md:grid-cols-2 lg:grid-cols-3 md:mx-6 lg:mx-8 gap-10">
                {topClasses.map((Class, index) => (
                    <div key={index} className="card full bg-base-100 shadow-xl">
                        <figure>
                            <img src={Class.image} className="w-full h-60" alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <p className="lg:text-lg font-semibold font-mono">Name : {Class.className}</p>
                            <p className="lg:text-lg font-semibold font-mono">Instructor : {Class.instructorName}</p>
                            <p className="lg:text-lg font-semibold font-mono">Available : {Class.availableSeats} seats</p>
                            <p className="lg:text-lg font-semibold font-mono">Price : ${Class.price}</p>
                            <p className="lg:text-lg font-semibold font-mono">Enrolled : {Class.enrolled} students</p>
                            <p className="lg:text-lg font-semibold font-mono">Academy : SportsMastery</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
};

export default PopularClasses;