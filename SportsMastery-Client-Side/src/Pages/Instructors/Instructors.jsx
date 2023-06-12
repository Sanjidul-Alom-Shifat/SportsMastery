// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Instructors = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const response = await axiosSecure.get('/instructors');
        return response.data;
    });

    console.log(instructors)

    return (
        <div className="mt-14 lg:mx-12">


            <Helmet>
                <title>SportsMastery | Instructors Page</title>
            </Helmet>
            

            <div className="grid grid-cols-1 mx-4  md:grid-cols-2 lg:grid-cols-3 md:mx-6 lg:mx-8 gap-10">
                {instructors.map((instructor, index) => (
                    <div key={index} className="card full bg-base-100 shadow-xl">
                        <figure>
                            <img src={instructor.photoURL} className="w-full h-60" alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <p className="lg:text-lg font-semibold font-mono">Name : {instructor.name}</p>
                            <p className="lg:text-lg font-semibold font-mono">Email : {instructor.email}</p>
                            <Link>
                                <div className="card-actions w-full justify-center mt-2">
                                    <button className="block w-full rounded btn btn-outline btn-accent">See Classes</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors;