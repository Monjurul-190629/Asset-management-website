import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CheckoutForm = ({ value }) => {

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();


    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const [limit, setLimit] = useState(0);


    const [employee, setEmployee] = useState(0);



    let totalPrice = 5;


    if (value == 2) {
        totalPrice = 8;

    }
    else if (value == 3) {
        totalPrice = 15;
    }


    useEffect(() => {
        fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setLimit(data.limit)
            })
    }, [])




    console.log(limit)

    /// for the employee
    useEffect(() => {
        fetch(`https://service-provider-website-server.vercel.app/companyHolder/${user.email}`)
            .then(res => res.json())
            .then(d => {
                setEmployee(d.Employee_count)
            })
    }, [])




    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])


    const updateLimit = async () => {

        let incrementValue = 5;
        if (value == 2) {
            incrementValue = 10;
        }
        else if (value == 3) {
            incrementValue = 20;
        }

        try {
            const res = await axiosSecure.put(`/companyHolder/${user.email}`, {
                limit: incrementValue + limit,
                Employee_count: employee
            });
            console.log('Limit updated', res.data);
        } catch (error) {
            console.error('Error updating limit', error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        console.log(user.email)

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', confirmError.message)
        }
        else {
            console.log('payment-intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),

                }





                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you",
                    showConfirmButton: false,
                    timer: 2000,

                });
                await updateLimit();
                navigate('/Dashboard/paymentHistory')
            }
        }

    }




    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Details</h2>

            <div className="mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                fontFamily: 'Arial, sans-serif',
                                color: '#333',
                                '::placeholder': {
                                    color: 'darkblue', // Light gray for placeholder text
                                },
                            },
                            invalid: {
                                color: '#e53e3e', // Error color
                            },
                        },
                    }}
                    className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <button
                className={`w-full py-2 px-4 text-white font-semibold rounded-md 
            ${!stripe || !clientSecret ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400'}`}
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            {transactionId && (
                <p className="text-sm text-green-700 mt-2">
                    Your transaction ID: <span className="font-semibold">{transactionId}</span>
                </p>
            )}
        </form>

    );
};

export default CheckoutForm;