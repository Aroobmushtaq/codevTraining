import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Time from './Time';
function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Time/>
      <Navbar />

      <div className="flex-grow">
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
