import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import { HiMiniArrowUturnRight } from "react-icons/hi2";


const SearchModal = ({ isOpen, onClose }) => {

  const[query,setQuery] = useState('');

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
            className="fixed right-0 top-0 h-full w-4/12 bg-white shadow-xl z-50 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              <HiMiniArrowUturnRight />
            </button>
            <div className="flex mt-8">
              <input
                type="text"
                className="w-full mt-4 p-6 text-3xl border-b border-gray-300 focus:outline-none text-black"
                placeholder="Search..."
                value={query}
                onInput={(e) => setQuery(e.target.value)}
              />
              <button className='text-4xl text-gray-400 border-b border-gray-300'><CiSearch /></button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
