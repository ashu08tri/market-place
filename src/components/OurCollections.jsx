import Link from 'next/link';
import React from 'react';

const getData = async () => {
    let res = await fetch('http://localhost:3000/api/landingPage/ourcollection');
    res = await res.json();
    return res;
}

async function OurCollections() {
    const data = await getData();

    return (
        <div className='h-screen px-12 md:px-24 py-10'>
            {
                data ? 
                <>
                <div className='py-10 flex justify-between'>
                <h1 className='text-3xl font-semibold uppercase'>{data[0].mainTitle}</h1>
                <div className='hidden md:block '>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/types/shop_all'>Explore All</Link></button>
                </div>
            </div>
                
                <div className='w-full h-3/4 overflow-x-scroll md:overflow-x-auto scrollbar-hide'>

                
            <div className='h-full flex w-[calc(200vw)] gap-1 md:w-full justify-center text-center text-white'>
                {
                  data[0].items.map((item,i) => <Link key={i} href={item.url} className='w-full h-full'>
                  <div className='bg-cover bg-center h-full w-full group flex flex-col justify-end transform hover:translate-y-0 transition-transform duration-300 ease-in-out' style={{backgroundImage: `url(${item.img})`}}>
                    <div className='pb-10 group-hover:pb-20'>
                        <p className='text-xl'>{item.title}</p>
                        <p className='py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:-translate-y-2'>Explore</p>
                    </div>
                </div>
                  </Link>)
                }
                
            </div>
            </div>
            <div className='md:hidden flex justify-center my-8'>
                    <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/types/shop_all'>Explore All</Link></button>
                </div>
                </> : <p>Problem loadind data from backend.</p>
            }
            
        </div>
    );
}

export default OurCollections;
