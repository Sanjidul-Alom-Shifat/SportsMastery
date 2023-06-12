import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Features = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    return (
        <section data-aos='zoom-in' className="bg-white dark:bg-gray-900 mt-8">
            <div className="container px-6 py-6 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">explore our    <br /> SportsMastery <span className="text-teal-500">Feature&#39;s</span></h1>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-teal-600 bg-teal-100 rounded-full dark:text-white dark:bg-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Personalized Training</h1>

                        <p className="text-gray-500 text-justify dark:text-gray-300">
                        Tailored plans to optimize performance and achieve goals through personalized training and expert guidance, unlocking athletes full potential.
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-base text-teal-600 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-600">
                            <span className="mx-1 ">read more</span>
                            <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-teal-600 bg-teal-100 rounded-full dark:text-white dark:bg-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Cutting-Edge Facilities</h1>

                        <p className="text-gray-500 text-justify dark:text-gray-300">
                            State-of-the-art sports facilities equipped with advanced equipment, modern amenities, and a conducive environment to enhance athletic development.
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-base text-teal-600 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-600">
                            <span className="mx-1">read more</span>
                            <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="inline-block p-3 text-teal-600 bg-teal-100 rounded-full dark:text-white dark:bg-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Elite Coaching Staff</h1>

                        <p className="text-gray-500 text-justify dark:text-gray-300">
                            Experienced and knowledgeable coaches dedicated to maximizing athletes potential, providing professional instruction, and fostering growth both on and off the field.
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-base text-teal-600 capitalize transition-colors duration-300 transform dark:text-teal-400 hover:underline hover:text-teal-600 dark:hover:text-teal-600">
                            <span className="mx-1">read more</span>
                            <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;