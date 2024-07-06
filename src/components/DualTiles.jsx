import React from 'react'

function DualTiles() {
    return (
        <div className='md:px-24 uppercase flex flex-col'>

            <div className='h-[calc(100vh-6rem)] flex flex-col md:flex-row justify-evenly md:justify-between md:items-center px-8 md:p-0'>
                <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest mt-12 md:my-12 gap-4'>
                    <h1 className='text-3xl'>HIGHEST QUALITY, <br />LOVE FOREVER</h1>
                    <p className=''>Sahara's Swimwear <br /> Makes You Look And Feel <br /> Confident And Sexy</p>
                    <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-5'>Learn More</button>
                </div>
                <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                    <img src="https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-174-min.jpg" alt="" className='md:ml-10 h-full md:h-5/6 w-full md:w-8/12' />
                </div>
            </div>

            <div className='h-[calc(100vh-6rem)] flex flex-col md:flex-row justify-evenly md:justify-between md:items-center px-8 md:p-0'>
                <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                    <img src="https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-855-min.jpg" alt="" className='md:mr-10 h-full md:h-5/6 w-full md:w-8/12' />
                </div>
                <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest md:my-12 gap-4'>
                    <h1 className='text-3xl'>SAHARA’S STORY</h1>
                    <p className=''>Our Swimwear Is Crafted With Eco-Friendly Materials, Ensuring A Sustainable Future</p>
                    <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-10'>Learn More</button>
                </div>
            </div>

        </div>
    )
}

export default DualTiles;