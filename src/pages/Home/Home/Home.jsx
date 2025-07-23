import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import PremiumMembers from '../../../components/PremiumMembers';
import HowItWorks from '../../../components/HowItWorks';
import SuccessStorySection from '../../../components/GotMarried/SuccessStorySection';
import SuccessCounter from '../../../components/GotMarried/SuccessCounter copy';
import Footer from '../../shared/Footer/Footer';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className='bg-pink-50'>
      <Banner />
      <PremiumMembers />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStorySection />
      <Footer />
    </div>
  );
};

export default Home;
