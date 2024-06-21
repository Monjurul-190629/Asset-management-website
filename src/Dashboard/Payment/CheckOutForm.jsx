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
        fetch('http://localhost:5000/companyHolder')
            .then(res => res.json())
            .then(data => {
                setLimit(data[0].limit)
            })
    }, [])


    console.log(limit)
    
    /// for the employee
    useEffect(() => {
        fetch(`http://localhost:5000/companyHolder/${user.email}`)
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
        if(value == 2){
            incrementValue = 10;
        }
        else if(value == 3){
            incrementValue = 20;
        }

        try {
            const res = await axiosSecure.put(`/companyHolder/${user.email}`, {
                limit: incrementValue + limit,
                Employee_count : employee 
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
        <form onSubmit={handleSubmit}>
            <CardElement
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
            <button className="btn btn-md btn-primary my-8" type="submit" disabled={!stripe || !clientSecret} >
                Pay
            </button>

            <p className="text-red-800">{error}</p>

            {transactionId && <p className="text-green-700"> Your transaction id: {transactionId}</p>}

        </form>
    );
};

export default CheckoutForm;