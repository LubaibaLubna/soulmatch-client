import React from 'react';
import Banner from '../../../components/Banner';
import PremiumMembers from '../../../components/PremiumMembers';
import HowItWorks from '../../../components/HowItWorks';
import SuccessCounter from '../../../components/SuccessCounter';
import SuccessStorySection from '../../../components/SuccessStorySection';

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