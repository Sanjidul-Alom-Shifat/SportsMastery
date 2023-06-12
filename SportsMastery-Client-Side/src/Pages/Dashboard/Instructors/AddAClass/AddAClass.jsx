// import React from 'react';

import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddAClass = () => {

    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=&key=${img_hosting_token}`;

    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imgResponse) => {
                if (imgResponse?.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);
                    const { className,  instructorEmail, instructorName, price, availableSeats } = data;
                    const newClass = {
                        className: className,
                        image: imgURL,
                        instructorName: instructorName,
                        instructorEmail: instructorEmail,
                        enrolled:0,
                        status: 'pending',
                        availableSeats: parseFloat(availableSeats),
                        price: parseFloat(price)
                    };
                    console.log(newClass);
                    axiosSecure.post('/classes', newClass)
                        .then((data) => {
                            console.log('after adding new data', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Class added successfully',
                                    showConfirmButton: true,
                                    // timer: 1500,
                                    confirmButtonText: 'Ok'
                                })
                            }
                        })
                }
            })
        // console.log(img_hosting_url)

    };


    return (
        <div className="px-4">

            <Helmet>
                <title>SportsMastery | Add Class</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Add <span className="text-teal-500">Classe&#39;s</span></h1>


            <div className="bg-teal-50 lg:px-11 py-8 mb-6 rounded-lg">

                <form onSubmit={handleSubmit(onSubmit)} className="mx-3">
                    {/* for name */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Class Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder=" Input Class Name"
                            className="input input-bordered w-full "
                            {...register("className", { required: true })}
                        />
                    </div>
                    {/* for instructor name and email */}
                    <div className=" md:flex my-4">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Instructor Name*</span>
                            </label>
                            <input
                                // type="text"
                                readOnly
                                defaultValue={user?.displayName}
                                placeholder="Input Instructor Name"
                                className="input input-bordered w-full "
                                {...register("instructorName", { required: true })}
                            />
                        </div>
                        {/* for price */}
                        <div className="form-control w-full mt-3 md:mt-0 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Instructor Email*</span>
                            </label>
                            <input
                                // type="email"
                                readOnly
                                defaultValue={user?.email}
                                placeholder="Input Instructor Email"
                                className="input input-bordered w-full "
                                {...register("instructorEmail", { required: true })}
                            />
                        </div>
                    </div>
                    {/* for seats and price */}
                    <div className=" md:flex my-4">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Available Seats*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Input Available Seats"
                                className="input input-bordered w-full "
                                {...register("availableSeats", { required: true })}
                            />
                        </div>
                        {/* for price */}
                        <div className="form-control w-full mt-3 md:mt-0 md:ml-4">
                            <label className="label">
                                <span className="label-text text-base font-semibold">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full "
                                {...register("price", { required: true })}
                            />
                        </div>
                    </div>

                    {/* for image */}
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text text-base font-semibold">Class Image*</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-accent w-full "
                            {...register("image", { required: true })}
                        />
                    </div>
                    {/* submit button */}
                    <div className="text-center">
                        <input className="btn  btn-accent  border-4 mt-4 lg:w-2/4" type="submit" value="Add a Class" />
                    </div>
                </form>

            </div>

        </div>
    );
};

export default AddAClass;





