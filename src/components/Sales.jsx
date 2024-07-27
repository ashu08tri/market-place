import React from 'react';
import Link from 'next/link';

const getData = async() => {
    try{
        let res = await fetch('http://localhost:3000/api/products/best_seller');
        res = await res.json();
        return res;
    }catch(err){
        console.log(err);
    }
}

async function Sales() {
    const data = await getData();
    return (
        <div className='h-screen px-12 md:px-24 py-10 bg-orange-50'>

            <div className='py-6 flex justify-between'>
                <h1 className='text-3xl font-semibold uppercase'>Best Sellers</h1>
                <div className='hidden md:block '>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/featured/best_seller'>Explore All</Link></button>
                </div>
            </div>

            <div className='w-full h-3/4 overflow-x-scroll scrollbar-hide'>
                <div className='flex h-full w-[calc(100vw * 6)] md:w-[calc(25% * 6)] md:overflow-x-scroll scrollbar-hide gap-1'>
                    {
                        data ? data.products.slice(0,5).map((item,i) => 
                            <div className="w-[80vw] md:w-[25%] h-full relative flex-shrink-0" key={i}>
                                
                                    <Link href={'/featured/best_seller/'+ item._id} className="flex flex-col items-center justify-center w-full md:w-full h-full overflow-hidden">
                                    <img src={item.img[0]} alt={item.title} className="object-cover h-full md:h-[88%] w-full" />
                                    <div className="flex flex-col items-center mt-3">
                                        <p>{item.title}</p>
                                        <p>{item.amount} &#x20B9;</p>
                                    </div>
                                    </Link>
                                
                            </div>) :<p>Failed to load data!</p>
                    }
                </div>
            </div>


            <div className='md:hidden flex justify-center my-8'>
                <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/featured/best_seller'>Explore All</Link></button>
            </div>
        </div>
    )
}

export default Sales;