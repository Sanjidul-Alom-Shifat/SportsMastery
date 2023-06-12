// import React from 'react';

import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import PopularClasses from "../PopularClasses/PopularClasses";

const Home = () => {
    return (
        <div>

            <Helmet>
                <title>SportsMastery | Home Page</title>
            </Helmet>

            <Banner></Banner>

            <PopularClasses></PopularClasses>

            <PopularInstructors></PopularInstructors>

            <Features></Features>

        </div>
    );
};

export default Home;