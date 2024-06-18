
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";





const PaymentHistory = () => {



    const { user } = useAuth();

    // Ensure user is not null before trying to access its properties
    if (!user) {
        return <div>Loading user data...</div>;
    }

    const email = user.email || 'No email provided';
    
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })


    return (
        <div className="text-center flex justify-center items-center bg-purple-300 rounded-lg py-20 px-10">
            <div className="overflow-x-auto text-center font-bold">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>price</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.date}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default PaymentHistory;