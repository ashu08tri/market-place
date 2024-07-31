import React from 'react';

const ContactUs = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">For any inquiries or support, please reach out to us using the following contact details:</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="text-gray-700">Customer Care Email: <a href="mailto:Care@ggccomp.in" className="text-blue-500">Care@ggccomp.in</a></p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Phone</h2>
        <p className="text-gray-700">Contact No & WhatsApp No: <a href="tel:+919930005234" className="text-blue-500">+91 9930005234</a></p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Website</h2>
        <p className="text-gray-700">Visit us at: <a href="https://ggccomp.in" className="text-blue-500" target="_blank" rel="noopener noreferrer">ggccomp.in</a></p>
      </div>
    </div>
  );
};

export default ContactUs;
