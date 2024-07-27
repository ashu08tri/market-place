import React from 'react';
import Link from 'next/link';

const getData = async() => {
  try {
      let res = await fetch('http://localhost:3000/api/landingPage/itemSale');
      res = await res.json();
      return res;
  } catch(err) {
      console.error(err);
      return [];
  }
}

async function ItemSale() {
  const data = await getData();

  return (
    <div className='h-screen uppercase md:flex text-white gap-1 tracking-wider'>
       {data ? <div className='bg-cover bg-center h-3/4 md:h-full w-full md:w-1/2 flex flex-col gap-5 justify-end items-center pb-12' style={{backgroundImage: `url(${data[0].image})`}}>
            <p className='text-3xl font-semibold uppercase'>{data[0].title}</p>
            <div><button className='border border-white bg-transparent hover:bg-white hover:text-black px-8 py-3'><Link href='/collections/mediterranean_love'>Shop Our Collection</Link></button></div>
        </div> : <p>Failed to load data!</p>}
        <div className='bg-teal-100 h-1/4 md:h-full w-full md:w-1/2 flex flex-col text-black items-center justify-center gap-4'>
        <p className='text-3xl md:pt-24'>ON SALE ITEMS</p>
        <p className='text-xl'>Discover our on sale items now.</p>
        <button className='border border-black bg-transparent hover:bg-black hover:text-white px-8 py-3 transition ease-in delay-50'><Link href='/featured/sale'>SHOP SALE</Link></button>
        </div>
    </div>
  )
}

export default ItemSale;