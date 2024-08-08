"use client"
import React, { useState } from 'react';
import { FiPhone } from "react-icons/fi";

const stores = [
    {
        storeName: 'FAE ULUWATU, BALI',
        address: 'Jl. Labuansait, Pecatu, Kec. Kuta Sel., Kabupaten Badung, Bali 80361, Indonesia',
        zipcode: 80361,
        openOn: 'Monday-Sunday: 9am-9pm',
        img: 'https://sahara-theme.myshopify.com/cdn/shop/files/IMG_6910_1024x1024_d8c6908b-f4c6-43b1-a325-ede8855b1be2.webp?v=1697010182&width=1440'
    },
    {
        storeName: 'FAE BYRON BAY, AUSTRALIA',
        address: '12/1 Porter St, Byron Bay, NSW, 2481, Australia',
        zipcode: 2481,
        openOn: '9am-4pm Mon-Fri, 10am-3pm Saturday',
        img: 'https://sahara-theme.myshopify.com/cdn/shop/files/104766089_962574754179485_2499654471741746808_n.jpg?v=1697010304&width=1440'
    },
];

function FindStore() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStores, setFilteredStores] = useState(stores);
    const [selectedStore, setSelectedStore] = useState(stores[0]);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = stores.filter(store =>
            store.storeName.toLowerCase().includes(term) ||
            store.address.toLowerCase().includes(term) ||
            store.zipcode.toString().includes(term)
        );
        setFilteredStores(filtered);
        if (filtered.length > 0) {
            setSelectedStore(filtered[0]);
        } else {
            setSelectedStore(null);
        }
    };

    const handleStoreClick = (store) => {
        setSelectedStore(store);
    };

    return (
        <div className='h-screen md:flex justify-center items-center px-4 md:px-20 mt-28 md:mt-0'>
            {/* address and search container */}
            <div className='w-full md:w-1/4 h-1/4 md:h-3/4 flex flex-col justify-end md:justify-start'>
                <div className='px-5 h-full md:h-1/4 bg-emerald-50 p-10 flex flex-col justify-center'>
                    <p className='text-2xl tracking-wide'>Find Store</p>
                    <input
                        type="text"
                        className='p-2 w-full mt-4'
                        placeholder='Enter zipcode or location'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className='hidden md:block w-full md:w-auto h-3/4 overflow-y-scroll scrollbar-hide bg-white p-5 flex-1 border'>
                    {filteredStores.map((store, index) => (
                        <div
                            key={index}
                            className='cursor-pointer mb-4 p-2'
                            onClick={() => handleStoreClick(store)}
                        >
                            <p className='text-lg text-gray-600'>{store.storeName}</p>
                            <p className='text-gray-500 text-s py-4'>{store.address}</p>
                            <p className='text-gray-500 text-sm'>{store.openOn}</p>
                            <div className='py-3 flex gap-4'>
                                <button className='px-4 py-1 text-sm bg-white hover:bg-black text-gray-500 hover:text-white border border-gray-400'>Directions</button>
                                <button className='px-4 py-1 text-sm bg-white hover:bg-black text-gray-500 hover:text-white border border-gray-400 flex gap-2 items-center'><span><FiPhone size={15} /></span><span>+919930005234</span></button>
                            </div>
                        </div>
                    ))}
                    {filteredStores.length === 0 && (
                        <p className='text-center mt-10'>Sorry, no store in this location</p>
                    )}
                </div>
            </div>
            {/* image display */}
            <div className='w-full md:w-3/4 h-3/4'>
                {selectedStore ? (
                   <div className='relative w-full h-full'>
                   <img src={selectedStore.img} alt="store" className='w-full h-full object-cover' />
                   <div className='absolute bottom-0 w-full flex flex-col justify-center p-4 md:hidden'>
                       <div className='bg-white p-4'>
                           <p className='text-lg text-gray-600'>{selectedStore.storeName}</p>
                           <p className='text-gray-500 text-s py-4'>{selectedStore.address}</p>
                           <p className='text-gray-500 text-sm'>{selectedStore.openOn}</p>
                           <div className='py-3 flex gap-4'>
                               <button className='px-4 py-1 text-sm bg-white hover:bg-black text-gray-500 hover:text-white border border-gray-400'>Directions</button>
                               <button className='px-4 py-1 text-sm bg-white hover:bg-black text-gray-500 hover:text-white border border-gray-400 flex gap-2 items-center'><span><FiPhone size={15} /></span><span>+919930005234</span></button>
                           </div>
                       </div>
                   </div>
               </div>
                ) : (
                    <p className='text-xl'>Sorry, no store in this location</p>
                )}
            </div>
        </div>
    );
}

export default FindStore;
