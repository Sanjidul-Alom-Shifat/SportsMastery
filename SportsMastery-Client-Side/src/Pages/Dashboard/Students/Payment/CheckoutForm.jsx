import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../../Provider/AuthProvider';
import useSelectedClasses from '../../../../Hooks/useSelectedClasses';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';


const CheckoutForm = () => {

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const [selectClasses] = useSelectedClasses();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    const enrollClass = selectClasses.find((classes) => classes.selectClassId === id);
    const price = enrollClass?.price;
    console.log('enrolclass', price)


    // for 
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then((response) => {
                    console.log(response.data.clientSecret);
                    setClientSecret(response.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // each type of element.
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }
        console.log('card', card);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log('paymentmethod', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('payment intent', paymentIntent)

        setProcessing(false);

        if (paymentIntent?.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent.id)
            // const transactionId = paymentIntent.id;
            const paymentInfo = {
                email: user?.email,
                price,
                date: new Date(),
                status: "service pending",
                enrolledClassId: enrollClass?._id,
                selectedClassId: enrollClass?.selectClassId,
                transactionId: paymentIntent.id,
                enrolledClassName: enrollClass?.className,

            };

            axiosSecure.post('/payments', paymentInfo)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.insertedId) {
                        // toast.success('update and paymet successfully')
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Payment added successfully',
                            showConfirmButton: true,
                            // timer: 1500,
                            confirmButtonText: 'Ok'
                        });
                        navigate('/dashboard/selectedClasses')
                    }
                })

            if (transactionId) {
                toast.success('Class payment added successfully');
                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'Payment added successfully',
                //     showConfirmButton: true,
                //     // timer: 1500,
                //     confirmButtonText: 'Ok'
                // })
            }
        }




    }


    return (
        <div className="flex flex-col mx-3 lg:w-3/4 md:mx-auto mt-3 md:mt-4 lg:mt-24 mb-6">
            <form className="my-4 " onSubmit={handleSubmit}>
                <div className="input_group ">
                    <CardElement
                        className="input_form px-1"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <div className="text-center">
                    <button
                        disabled={!stripe || !clientSecret || processing}
                        className="btn  btn-accent btn-wide mt-6 lg:mt-8 mb-10"
                        type="submit"
                    >
                        Payment
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600 ml-8 mt-5 mb-40 font-mono font-medium text-lg"> Error : {cardError}</p>}
            {transactionId && <p className="text-green-500 mt-5 mb-40 font-mono font-medium text-lg">Transaction complete with transactionId : {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;