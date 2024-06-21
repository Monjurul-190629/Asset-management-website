import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from 'react-router-dom';
import CheckoutForm from "./CheckOutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    console.log(import.meta.env.VITE_Payment_Gateway_PK)
    
    // payment value
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('value');
    console.log("value ", value)
    
    return (
        <div className="pt-20">
            <div>
                <SectionTitle heading={'Payment'}></SectionTitle>
            </div>
            <div className="">
                <Elements stripe = {stripePromise}>
                    <CheckoutForm value = {value}></CheckoutForm>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;