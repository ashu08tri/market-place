import Link from 'next/link';
import React from 'react';
import EditBanner from './landingPage/EditBanner';

const getData = async() => {
  try{
    let res = await fetch('http://localhost:3000/api/landingPage/banner');
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function Banner() {
  const data = await getData();
  return (
    <>
    {
      data ? data.map((item,i) => <div key={i} className='h-96 relative flex flex-col tracking-wider justify-center text-white gap-5 items-center bg-cover bg-center' style={{backgroundImage: `url(${item.image})`}}>
      <EditBanner item={item} api={'http://localhost:3000/api/landingPage/banner'} storageUrl={'banner'}/>
      <p className='text-xs'>{item.title}</p>
      <p className='text-4xl'>{item.title2}</p>
      <div className='flex gap-3'>
          <button className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'><Link href={item.url}>Shop New In</Link></button>
          <button className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'><Link href={item.url2}>All Products</Link></button>
      </div>
  </div>) : <p>Failed to load data!</p>
    }
    </>
  )
}

export default Banner