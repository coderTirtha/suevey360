import { useEffect, useState } from "react";
import faq from "../../../assets/faq.png";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const FAQ = () => {
    const axiosPublic = useAxiosPublic();
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        axiosPublic.get('/faq')
            .then(res => {
                setFaqs(res.data);
            });
    }, []);
    return (
        <div className="my-8 mx-4">
            <h1 className="text-4xl font-bold text-center">Frequently Asked Questions</h1>
            <div className="flex justify-center items-center gap-4 my-6">
                <div className="flex-1">
                    <img src={faq} alt="" />
                </div>
                <div className="flex-1">
                    {
                        faqs.map(faq => <div key={faq._id} className="collapse collapse-arrow rounded-sm my-4">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <hr />
                            <div className="collapse-content">
                                <p className="text-gray-500">{faq.answer}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FAQ;