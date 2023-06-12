// import React from 'react';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';


const SignUp = () => {

    const {
        CreateUser,
        UpdateUserData,
        GoogleSignIn,
        loading,
        setLoading,
        LogOutUser
    } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setshowConfirmPassword(!showConfirmPassword);
    }

    const onSubmit = (data) => {

        if (data.password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        if (data.password !== data.confirmpassword) {
            toast.error('Password and confirm password do not match.');
            return;
        }

        if (!/[A-Z]/.test(data.password)) {
            toast.error('Password must have at least one uppercase letter.');
            return;
        }

        if (!/[!@#$&*]/.test(data.password)) {
            toast.error('Password must have at least one special character.');
            return;
        }

        console.log(data);
        CreateUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                UpdateUserData(data.name, data.photoURL)
                    .then(() => {

                        const savedUser = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL
                        }

                        fetch('https://summer-camp-server-xi-three.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: true,
                                        // timer: 1500
                                    });
                                    // navigate(from, { replace: true });
                                }
                            })
                            .catch((error) => {
                                // setLoading(false);
                                console.log(error);
                                toast.error(error.message);
                            })
                    })
                    
                    LogOutUser()
                    .then((result) => {
                      console.log(result.user);
                    })
                  navigate("/login");
            })
            .catch((error) => {
                // setLoading(false);
                toast.error(error.message);
            });
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
                            title: 'User successfully sign up by google.',
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
                <title>SportsMastery | Sign Up Page</title>
            </Helmet>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 md:p-7 rounded-lg shadow-2xl shadow-gray-500 dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                    <div>
                        <label htmlFor="name" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Name</label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='name'
                                placeholder='Name'
                                {...register("name", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
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
                        <label htmlFor="photo" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Photo </label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='photoURL'
                                placeholder='Photo URL'
                                {...register("photoURL", { required: true })}
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
                                <input onChange={handleShowPassword} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>

                    {/* for confirm password */}
                    <div>
                        <label htmlFor="confirmpassword" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="input_group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmpassword'
                                placeholder='Confirm Password'
                                className="input_text"
                                required
                                {...register("confirmpassword", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleShowConfirmPassword} id="remembers" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>

                    {/* login buttons */}
                    <div className="">
                        <button type='submit' className="btn w-full btn-outline btn-accent ">
                            Register
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
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>



        </div>
    );
};

export default SignUp;