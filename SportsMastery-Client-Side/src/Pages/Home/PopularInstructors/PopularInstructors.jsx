import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const PopularInstructors = () => {

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const { data: PopularInstructors = [], refetch } = useQuery({
        queryKey: ["popularInstructors"],
        queryFn: async () => {
            const res = await fetch('https://summer-camp-server-xi-three.vercel.app/popularInstructors');
            return res.json();
        }
    })

    console.log(PopularInstructors)

    return (
        <div data-aos='zoom-in' className='lg:mx-12 mt-6 lg:mt-16 mb-6'>

            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">review our    <br /> Popular <span className="text-teal-500">Instructor&#39;s</span></h1>

            <div className="grid grid-cols-1 mx-4 lg:mt-12 mt-7 md:grid-cols-2 lg:grid-cols-3 md:mx-6 lg:mx-8 gap-10">
                {PopularInstructors.map((instructor, index) => (
                    <div key={index} className="card full bg-base-100 shadow-xl">
                        <figure>
                            <img src={instructor.photoURL} className="w-full h-60" alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <p className="lg:text-lg font-semibold font-mono">Name : {instructor.name}</p>
                            <p className="lg:text-lg font-semibold font-mono">Email : {instructor.email}</p>
                            <p className="lg:text-lg font-semibold font-mono">Academy : SportsMastery</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default PopularInstructors;