import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";


const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    console.log(import.meta.env.VITE_Payment_Gateway_PK)
    
    return (
        <div className="pt-20">
            <div>
                <SectionTitle heading={'Payment'}></SectionTitle>
            </div>
            <div className="">
                <Elements stripe = {stripePromise}>
                    <CheckOutForm/>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;