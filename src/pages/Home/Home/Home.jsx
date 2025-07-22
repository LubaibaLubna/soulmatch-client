import React from 'react';
import Banner from '../../../components/Banner';
import PremiumMembers from '../../../components/PremiumMembers';
import HowItWorks from '../../../components/HowItWorks';
import SuccessStorySection from '../../../components/GotMarried/SuccessStorySection';
import SuccessCounter from '../../../components/GotMarried/SuccessCounter copy';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
    return (
        <div className='bg-pink-50'>
            <Banner></Banner>
            <PremiumMembers></PremiumMembers>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStorySection></SuccessStorySection>
            <Footer></Footer>
        </div>
    );
};

export default Home;