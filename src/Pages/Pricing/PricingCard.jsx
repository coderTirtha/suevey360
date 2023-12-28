import { TiTickOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

const PricingCard = ({ price }) => {
    const { _id, name, duration, price: cost, features } = price;
    return (
        <div>
            <div className="card min-h-[380px] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{duration}</p>
                    <p>{cost}</p>
                    <ul className='my-4'>
                        {
                            features.map((feature, idx) => <li className="flex items-center mr-2" key={idx}><TiTickOutline className="text-green-500" /><span>{feature}</span></li>)
                        }
                    </ul>
                    <div className="card-actions">
                        <Link className="w-full" to={`/checkout/${_id}`}>
                            <button className="btn bg-[#545454] text-white hover:text-[#545454] btn-block">Buy Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;