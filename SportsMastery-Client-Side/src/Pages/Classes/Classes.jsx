import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";

const Classes = () => {

    const [axiosSecure] = useAxiosSecure();
    const { data: approvedClasses = [], refetch } = useQuery(['approvedClasses'], async () => {
        const response = await axiosSecure.get('/approvedCard');
        return response.data;
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    console.log(approvedClasses);

    const HandleToCart = (selectClass) => {

        if (user && user.email) {

            const { className, instructorName, _id, price, image } = selectClass;
            const newSelectClass = {
                selectClassId: _id,
                studentEmail: user?.email,
                className,
                instructorName,
                price,
                image
            };
            console.log(newSelectClass);
            axiosSecure.post('/selectedClasses', newSelectClass)
                .then((response) => {
                    if (response.data.insertedId) {
                        console.log(response.data)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class has been selected successfully.',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                    }
                })

        }
        else {
            Swal.fire({
                title: 'Login First',
                text: "Otherwise you won't be able to access select class !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            })
        }
    }



    return (
        <div className="mt-14 lg:mx-12">

            <Helmet>
                <title>SportsMastery | Classes Page</title>
            </Helmet>

            <div className="grid grid-cols-1 mx-4  md:grid-cols-2 lg:grid-cols-3 md:mx-6 lg:mx-8 gap-10">
                {approvedClasses.map((Class, index) => (
                    <div key={index}
                        // className="card full bg-base-100 shadow-xl"
                        className={`card full bg-base-100 ${Class.availableSeats === 0 ? "bg-red-300 shadow-xl" : "shadow-xl"
                            }`}
                    >
                        <figure>
                            <img src={Class.image} className="w-full h-60" alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <p className="lg:text-lg font-semibold font-mono">Class Name : {Class.className}</p>
                            <p className="lg:text-lg font-semibold font-mono">Instructor : {Class.instructorName}</p>
                            <p className="lg:text-lg font-semibold font-mono">Available Seats : {Class.availableSeats} seats</p>
                            <p className="lg:text-lg font-semibold font-mono">Course Price : ${Class.price} </p>

                            <div className="card-actions w-full justify-center mt-2">
                                <button
                                    onClick={() => HandleToCart(Class)}
                                    disabled={Class.availableSeats === 0 || isAdmin === true || isInstructor === true}
                                    className="block w-full rounded btn btn-outline btn-accent"
                                >
                                    <Link>
                                        Select Class
                                    </Link>
                                </button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Classes;