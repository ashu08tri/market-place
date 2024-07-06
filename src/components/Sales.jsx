import React from 'react'

function Sales() {
    return (
        <div className='h-screen px-12 md:px-24 py-10 bg-orange-50'>

            <div className='py-6 flex justify-between'>
                <h1 className='text-3xl font-semibold uppercase'>Best Sellers</h1>
                <div className='hidden md:block '>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>View All</button>
                </div>
            </div>

            <div className='w-full h-3/4 overflow-x-scroll scrollbar-hide'>
                <div className='flex h-full w-[calc(100vw * 6)] md:w-[calc(25% * 6)] md:overflow-x-scroll scrollbar-hide gap-1'>
                    <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                            <img src="https://sahara-theme.myshopify.com/cdn/shop/products/Photo29-8-2022_115044am.jpg" alt="img" className="object-cover h-full md:h-[88%] w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <p>Product Name</p>
                                <p>Amount</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                            <img src="https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-047.jpg" alt="img" className="object-cover h-full md:h-[88%] w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <p>Product Name</p>
                                <p>Amount</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                            <img src="https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-363.jpg" alt="img" className="object-cover h-full md:h-[88%] w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <p>Product Name</p>
                                <p>Amount</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                            <img src="https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudio-183.jpg" alt="img" className="object-cover h-full md:h-[88%] w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <p>Product Name</p>
                                <p>Amount</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0">
                        <div className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                            <img src="https://sahara-theme.myshopify.com/cdn/shop/products/Photo29-3-22_101519am.jpg" alt="img" className="object-cover h-full md:h-[88%] w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <p>Product Name</p>
                                <p>Amount</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='md:hidden flex justify-center my-8'>
                <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Explore All</button>
            </div>
        </div>
    )
}

export default Sales;