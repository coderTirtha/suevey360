import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Rating from 'react-rating';
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        axiosPublic.get('/testimonials')
            .then(res => {
                setTestimonials(res.data);
            })
    }, []);
    return (
        <div>
            <div className="my-8 space-y-3">
                <h1 className="text-center text-4xl font-bold">What out Customers Say!</h1>
                <p className="text-gray-400 text-center">See Why Users Love Survey360!</p>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper rounded-lg my-8"
            >
                {
                    testimonials.map(testimonial => <SwiperSlide>
                        <div className='flex justify-center items-center'>
                            <div className='flex flex-col justify-center items-center rounded-lg p-8'>
                                <img src={testimonial.avatar} alt="" className='w-[150px] h-[150px] rounded-full object-cover' />
                                <div className='text-center space-y-3'>
                                    <h1 className='text-2xl font-bold'>{testimonial.name}</h1>
                                    <h4 className='text-[#545454]'>{testimonial.occupation}</h4>
                                    <Rating
                                        emptySymbol="fa fa-star-o"
                                        fullSymbol="fa fa-star"
                                        fractions={4}
                                        initialRating={testimonial.rating}
                                        readonly
                                    />
                                    <p>{testimonial.testimonial}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;