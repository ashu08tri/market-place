"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiMiniArrowUturnRight } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from 'next/navigation';

const {NEXT_PUBLIC_HOST_URL} = process.env;

function CartModal({ isOpen, onClose }) {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState();
  const [del, setDel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(NEXT_PUBLIC_HOST_URL+'/api/cart', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are sent
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCartData(data.cartData); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching cart data:', error.message);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, [del]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'drawer-overlay') {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  const handleDecrease = (id, size) => {
    setCartData(prevData =>
      prevData.map(item =>
        item._id === id && item.quantity > 1 && item.size === size
          ? { ...item, quantity: item.quantity - 1, amount: (item.quantity - 1) * item.unitPrice }
          : item
      )
    );
  };

  const handleIncrease = (id, size) => {
    setCartData(prevData =>
      prevData.map(item =>
        item._id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1, amount: (item.quantity + 1) * item.unitPrice }
          : item
      )
    );
  };

  const paymentPage = async () => {
    try {
     
      // Prepare the data to be sent
      const paymentData = cartData.map(item => ({
        id: item._id,
        title: item.title,
        quantity: item.quantity,
        img: item.img,
        amount: item.amount,
        size: item.size,
        sessionId: item.sessionId,
      }));

      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include'
        },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) {
        throw new Error('Failed to complete payment');
      }

      // Close the cart modal and redirect to the payment page
      onClose();
      router.push('/payment');
    } catch (error) {
      console.error('Error posting payment data:', error.message);
    }
  };

  const deleteItem = async(id) => {
    setLoading(true)
    try{
      let res = await fetch(`/api/cart/${id}`,{
        method: 'DELETE',
        cache: 'no-store'
      })
      res = await res.json();
      if(res.ok){
        setDel(!del);
        setLoading(false);
      }
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div id="drawer-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-8/12 md:w-4/12 bg-white shadow-xl z-50 p-6 overflow-y-scroll scrollbar-hide"
          >
            <button
              onClick={onClose}
              className="absolute top-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              <HiMiniArrowUturnRight />
            </button>
            <div className="flex flex-col mt-8 text-black ">
              <h1 className="py-2 border-b text-2xl">Your Cart</h1>
              {/* Cart Data rendering */}
              {loading ? (
                <div className='h-72 content-center mx-auto'>
                  <BeatLoader loading={loading} size={20} color='black'
                    aria-label="Loading Spinner"
                    data-testid="loader" />
                </div>
              ) : cartData.length > 0 ? (
                cartData.map((item, i) => (
                  <div key={i} className="flex items-center p-4 border-b border-gray-200">
                    <img src={item.img} alt={item.title} className="w-20 h-28 object-cover rounded mr-4" />
                    <div className='flex justify-between w-full'>
                    <ul className="flex-1">
                      <li className="mb-2">
                        <p className="text-lg font-semibold">{item.title}</p>
                      </li>
                      <li className="flex items-center justify-between mb-2">
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrease(item._id, item.size)}
                            className="bg-black text-white px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <p className='px-6'>{item.quantity}</p>
                          <button
                            onClick={() => handleIncrease(item._id, item.size)}
                            className="bg-black text-white px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </li>
                      <li className="mb-2">
                        <p>Size: {item.size}</p>
                      </li>
                      <li>
                        <p>Amount: ₹{item.amount}</p>
                      </li>
                    </ul>
                    <button className='text-xl self-start' onClick={() => deleteItem(item._id)}><RiDeleteBinLine /></button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-2">Your cart is empty!</p>
              )}
              {cartData.length === 0 ? (
                <Link
                  href='/'
                  onClick={onClose}
                  className="text-white bg-black py-2 px-20 mt-5 text-center text-xs md:text-base hover:bg-white border border-black hover:text-black"
                >
                  Continue Shopping
                </Link>
              ) : (
                <button
                  onClick={paymentPage}
                  className="text-white bg-black py-2 px-20  mt-5 text-xs md:text-base hover:bg-white border border-black hover:text-black"
                >
                  Complete Payment
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default CartModal;
