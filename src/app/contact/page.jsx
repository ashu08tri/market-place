import React from 'react';
import Logo from '../../../public/assets/U.png';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="pt-40 flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-10 px-12">
      <div className='w-full md:w-1/2 flex justify-center'>
      <div>
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">For any inquiries or support, please reach out to us using the following contact details:</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="text-gray-700">Customer Care Email: <a href="mailto:Care@urbangents.in" className="text-blue-500">Care@urbangents.in</a></p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Phone</h2>
        <p className="text-gray-700">Contact No & WhatsApp No: <a href="tel:+9199XXXXXXXX" className="text-blue-500">+91 99XXXXXXXX</a></p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Website</h2>
        <p className="text-gray-700">Visit us at: <a href="https://market-five-mu.vercel.app/" className="text-blue-500" target="_blank" rel="noopener noreferrer">Urban Gents</a></p>
      </div>
      </div>
      </div>
      <div className='w-full md:w-1/2 flex justify-center mb-4 md:m-0'>
        <Image src={Logo} alt="logo" className='w-8/12 object-cover'/>
      </div>
    </div>
  );
};

export default ContactUs;
