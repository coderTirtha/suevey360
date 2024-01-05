import { useParams } from "react-router-dom";

const CheckoutSuccess = () => {
    const {trans_id} = useParams();
    return (
        <div>
            <h3>Payment Succeeded</h3>
            <p><span>Your Transaction Id : </span>{trans_id}</p>
        </div>
    );
};

export default CheckoutSuccess;