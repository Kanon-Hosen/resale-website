import React from 'react';
import Advertise from '../Components/Advertise';
import Category from '../Components/Category';
import Hero from '../Components/Hero';
import Service from '../Components/Service';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Category></Category>
            <Service></Service>
            <Advertise></Advertise>
        </div>
    );
};

export default Home;