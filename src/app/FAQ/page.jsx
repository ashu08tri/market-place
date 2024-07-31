'use client'
import { useState } from 'react';

function Page() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (question) => {
      setOpenQuestion(openQuestion === question ? null : question);
    };
  
    return (
      <div className='max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Frequently Asked Questions</h1>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Orders</h2>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('orders1')}
            >
              Will my money be refunded or will I get a credit voucher?
            </button>
            {openQuestion === 'orders1' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  In case of returns, we will credit the amount you paid for the products in your bank account, in case of a Cash on Delivery order or the account/card amount was paid from, in case of prepaid orders. We are sorry to inform you we do not have exchange available.
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Shipping</h2>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('shipping1')}
            >
              What shipping method does the website use?
            </button>
            {openQuestion === 'shipping1' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  We use a large network of courier partners to deliver your products including Blue Dart, Delhivery, and Xpressbees, etc for domestic orders, and DHL for International Orders.
                </p>
              </div>
            )}
          </div>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('shipping2')}
            >
              What are the charges for shipping in India?
            </button>
            {openQuestion === 'shipping2' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  Shipping is free within India for orders above 1500 Rupees. Orders below 1500 Rupees will carry a charge of additional 99 Rupees which is non-refundable.
                </p>
              </div>
            )}
          </div>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('shipping4')}
            >
              How long until my order ships?
            </button>
            {openQuestion === 'shipping4' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  We dispatch products from Monday to Friday. Once you place the order, we will aim to dispatch the order in 2-3 working days. Should there be a delay, you will be informed by the Customer care team.
                </p>
              </div>
            )}
          </div>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('shipping5')}
            >
              How does cash on delivery work?
            </button>
            {openQuestion === 'shipping5' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  COD is only available at selected zip codes and for orders below 20000 Rupees.
                </p>
                <p className='mt-2'>
                  To check availability of COD at your zip code, kindly check below:
                  Once you have placed your order with selecting payment method &apos;Cash On Delivery&apos;, we follow a simple process:
                  You will receive an email to inform you that we have received your order and details.
                </p>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-4'>General</h2>
          <div className='mb-4'>
            <button
              className='w-full text-left text-lg font-medium p-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
              onClick={() => toggleQuestion('general1')}
            >
              Do I need to set up an account to place an order?
            </button>
            {openQuestion === 'general1' && (
              <div className='p-4 bg-gray-50 rounded-b-md'>
                <p>
                  No, You don&apos;t need to signup to make a purchase! Though you will need to provide your information with shipping address and your email for contact.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='mt-6 text-center'>
          <p>For any enquiries, complaints or concerns email us on <a href='mailto:Care@ggccomp.in' className='text-blue-500 underline'>Care@ggccomp.in</a> or call us on <a href='tel:+919930005234' className='text-blue-500 underline'>+91 9930005234</a> from Monday to Friday between 9.00 AM - 6.00 PM.</p>
        </div>
      </div>
    );
}

export default Page;
