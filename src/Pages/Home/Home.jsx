import bannerImg from '../../assets/banner-final-transparent.gif';
import bannerBg from '../../assets/banner-bg.jpg';
const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerBg})` }}>
                <div className="hero-overlay bg-opacity-75"></div>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='flex-1 flex justify-center items-center'>
                        <img src={bannerImg} className="" />
                    </div>
                    <div className='flex-1 text-[#e5e5e5]'>
                        <h1 className="text-5xl font-bold">Make your survey more convenient with Survey360!</h1>
                        <p className="py-6">Welcome to Survey360, where every voice matters. Dive into a world of thought-provoking surveys designed to capture your unique perspectives.</p>
                        <button className="btn bg-[#fca311] text-white border-0 hover:text-[#fca311]">Explore Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;