'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AnimatedBlock from '@/components/shared/MotionParent';
import DashboardLeft from '@/components/affiliate/DashboardLeft';
import Loader from '@/components/Loader';

const AffiliateLayout = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  // Delay until client is mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Don't use useSelector until client-side
  const { userInfo, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (hasMounted && !loading && !userInfo) {
      router.replace('/affiliate/login');
    }
  }, [hasMounted, loading, userInfo, router]);

  // Wait for client mount and auth check
  if (!hasMounted || loading || (!userInfo && typeof window !== 'undefined')) {
    return <Loader />;
  }

  return (
    <section className="sec_admin">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="dashboard_wrapper grid grid-cols-6 gap-6 md:gap-10 justify-between flex-col sm:flex-row">
          <DashboardLeft />
          <div className="dashboard_right py-6 md:py-10 px-4 col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-5">
            <AnimatedBlock direction="right">{children}</AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateLayout;
