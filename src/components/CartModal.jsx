import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMiniArrowUturnRight } from "react-icons/hi2";

function CartModal({ isOpen, onClose }) {
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
    
      return (
        <>
          {isOpen && (
            <div id="drawer-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-8/12 md:w-4/12 bg-white shadow-xl z-50 p-6"
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 text-gray-600 hover:text-gray-800 text-2xl"
                >
                  <HiMiniArrowUturnRight />
                </button>
                <div className="flex flex-col  mt-8 text-black">
                    <h1 className='py-2 border-b'>Your Cart is empty!</h1>
                 {/* Cart Data rendering */}
                  <button className='text-white bg-black py-2 px-20 mt-5 text-xs md:text-base hover:bg-white border border-black hover:text-black'>Continue Shopping</button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      );
}

export default CartModal;