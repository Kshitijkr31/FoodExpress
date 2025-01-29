import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                toast.success("🎉 Your order has been placed!", { autoClose: 2000 });  // ✅ Order placed message
                setTimeout(() => {
                    navigate("/myorders");
                }, 2000);  // ✅ Wait for the toast to be visible before redirecting
            } else {
                toast.error("❌ Payment verification failed!", { autoClose: 2000 });
                navigate("/");
            }
        } catch (error) {
            toast.error("⚠️ Something went wrong!", { autoClose: 2000 });
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
