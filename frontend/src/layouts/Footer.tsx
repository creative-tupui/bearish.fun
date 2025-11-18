import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content flex justify-between items-center text-gray-tertiary font-oxanium font-medium text-sm leading-[135%]">
        <div className="footer-title">
          <p className="">
            © bearish.fun 2024
          </p>
        </div>
        <div className="footer-links flex items-center gap-4">
          <div><a href="/privacy-policy" className="text-inherit">Privacy Policy</a></div>
          <div><a href="/terms-of-service" className="text-inherit">Terms of Service</a></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;