import React from 'react';

function OurCollections() {
    return (
        <div className='h-screen px-12 md:px-24 py-10'>

            <div className='py-10 flex justify-between'>
                <h1 className='text-3xl font-semibold uppercase'>OUR COLLECTIONS</h1>
                <div className='hidden md:block '>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Explore All</button>
                </div>
            </div>
                
                <div className='w-full h-3/4 overflow-x-scroll md:overflow-x-auto scrollbar-hide'>

                
            <div className='h-full flex w-[calc(200vw)] md:w-full justify-center text-center text-white'>
                <div className='bg-cover bg-center h-5/12 w-1/3 group flex flex-col justify-end transform hover:translate-y-0 transition-transform duration-300 ease-in-out' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-834_2_-min.jpg)'}}>
                    <div className='pb-10 group-hover:pb-20'>
                        <p className='text-xl'>Some Text</p>
                        <p className='py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:-translate-y-2'>more Text</p>
                    </div>
                </div>
                <div className='bg-cover bg-center group h-5/12 w-1/3 mx-1 flex flex-col justify-end transform hover:translate-y-0 transition-transform duration-300 ease-in-out' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-437_4_-min.jpg)'}}>
                    <div className='pb-10 group-hover:pb-20'>
                        <p className='text-xl'>Some Text</p>
                        <p className='py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:-translate-y-2'>more Text</p>
                    </div>
                </div>
                <div className='bg-cover bg-center group h-5/12 w-1/3 flex flex-col justify-end transform hover:translate-y-0 transition-transform duration-300 ease-in-out' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/fae_-35.jpg)'}}>
                    <div className='pb-10 group-hover:pb-20'>
                        <p className='text-xl'>Some Text</p>
                        <p className='py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:-translate-y-2'>more Text</p>
                    </div>
                </div>
            </div>
            </div>
            <div className='md:hidden flex justify-center my-8'>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Explore All</button>
                </div>
        </div>
    );
}

export default OurCollections;
