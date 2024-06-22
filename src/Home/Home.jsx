import { Helmet } from "react-helmet";
import About from "./About";
import Banner from "./Banner";
import PackageSection from "./PackageSection";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <PackageSection></PackageSection>
        </div>
    );
};

export default Home;