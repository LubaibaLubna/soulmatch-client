import React from 'react';
import Banner from '../../../components/Banner';
import PremiumMembers from '../../../components/PremiumMembers';
import HowItWorks from '../../../components/HowItWorks';
import SuccessStorySection from '../../../components/GotMarried/SuccessStorySection';
import SuccessCounter from '../../../components/GotMarried/SuccessCounter copy';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PremiumMembers></PremiumMembers>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStorySection></SuccessStorySection>
        </div>
    );
};

export default Home;