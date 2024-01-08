import Banner from "./components/Banner";
import FAQ from "./components/FAQ";
import LatestSurveys from "./components/LatestSurveys";
import Testimonials from "./components/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestSurveys></LatestSurveys>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;