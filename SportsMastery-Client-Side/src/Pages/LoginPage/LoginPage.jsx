// import React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';


const LoginPage = () => {

    const { loading, setLoading, LoginUser, GoogleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (data) => {
        LoginUser(data.email, data.password)
            .then((result) => {
                const LoggedUser = result.user;
                console.log(LoggedUser);
                // toast.success('Login Successfully');
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User login successfully.',
                    showConfirmButton: true,
                    // timer: 1500
                });
                navigate(from, { replace: true });

            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                toast.error(error.message);
                console.log(errorMessage);
            })
    }

    const HandleGoogleLogin = () => {
        GoogleSignIn()
            .then(result => {
                const loggerUser = result.user
                console.log(loggerUser);

                const savedUser = {
                    name: loggerUser.displayName,
                    email: loggerUser.email,
                    photoURL: loggerUser.photoURL
                };

                fetch('https://summer-camp-server-xi-three.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then((response) => response.json())
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User successfully login by google.',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        navigate(from, { replace: true });
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                        toast.error(error.message);
                    })
            })
            .catch(error => {
                setLoading(false);
                const ErrorMessage = error.message;
                console.log(ErrorMessage)
                toast.error(error.message);
            })
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-4 py-8 lg:px-8 ">

            <Helmet>
                <title>SportsMastery | Login Page</title>
            </Helmet>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 md:p-7 rounded-lg shadow-gray-500 shadow-2xl dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                    <div>
                        <label htmlFor="email" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <div className="input_group ">
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                {...register("email", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="input_group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder='password'
                                className="input_text"
                                required
                                {...register("password", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleShowPassword} id="sremember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>

                    {/* login buttons */}
                    <div className="input-button">
                        <button type='submit' className="w-full btn btn-outline btn-accent ">
                            Login
                        </button>
                    </div>
                    <div className="mt-3 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <div className="input-button">
                        <button onClick={HandleGoogleLogin} type='button' className="button_custom rounded-md font-semibold">
                            Sign In with Google <FaGoogle className='h-6 w-9'></FaGoogle>
                        </button>
                    </div>

                </form>

                {/* bottom */}
                <div className="mt-7 mb-6 text-sm flex justify-between items-center text-[#002D74]">
                    <p>Don<span>&#39;</span>t have an account?</p>
                    <Link to="/signup">
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>



        </div>
    );
};

export default LoginPage;