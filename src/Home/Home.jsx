import { Helmet } from "react-helmet";
import About from "./About";
import Banner from "./Banner";
import PackageSection from "./PackageSection";
import Extra from "./Extra";


const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <About></About>
            <Extra></Extra>
            <PackageSection></PackageSection>
        </div>
    );
};

export default Home;