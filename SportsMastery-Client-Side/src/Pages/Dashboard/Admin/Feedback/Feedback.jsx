import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Feedback = () => {

    const [axiosSecure] = useAxiosSecure()
    const id = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        const { feedback } = data;
        const classInfo = { feedback };
        console.log(classInfo);
        axiosSecure.put(`/classes/feedback/${data.id}`, classInfo)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Feedback update successfully.',
                        showConfirmButton: true,
                        // timer: 1500
                    });
                    navigate('/dashboard/manageClasses');                   
                }
            })

    }

    return (
        <div>

            <Helmet>
                <title>SportsMastery | Manage Classes</title>
            </Helmet>

            <h1 className="text-xl mt-5 mb-7 lg:mb-9 font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Update <span className="text-teal-500">Feedback</span></h1>

            <div className="mt-10 mb-8 mx-2 sm:mx-auto sm:w-full sm:max-w-sm p-4 md:p-7 rounded-lg shadow-gray-500 shadow-2xl dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-semibold font-mono leading-9 tracking-tight text-gray-900">Detail&#39;s</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                    <div className="hidden">
                        <input
                            placeholder="Type here"
                            value={id.id}
                            className="input mt-2 mr-6 input-bordered input-accent w-full"
                            {...register("id")}
                        />
                    </div>

                    <div>
                        <label className="block mb-3  text-lg font-medium text-gray-900 dark:text-white">Class Feedback :</label>
                        <div className="input_group ">
                            <textarea
                                placeholder="Enter Class Feedback"
                                required
                                className="input_text h-56"
                                {...register("feedback")}
                            />
                        </div>
                    </div>


                    {/* login buttons */}
                    <div className="input-button">
                        <button type='submit' className="w-full btn btn-outline btn-accent ">
                            submit
                        </button>
                    </div>


                </form>

                {/* bottom */}

            </div>

        </div>
    );
};

export default Feedback;