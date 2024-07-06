import React from 'react'

function Banner() {
  return (
    <div className='h-96 flex flex-col tracking-wider justify-center text-white gap-5 items-center bg-cover bg-center' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/sahara-home-full-width-banner.jpg)'}}>
        <p className='text-xs'>LUXURY SWIMWEAR CREATED WITH CARE</p>
        <p className='text-4xl'>SPRING/SUMMER 2024</p>
        <div className='flex gap-3'>
            <button className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'>Show New in</button>
            <button className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'>All Products</button>
        </div>
    </div>
  )
}

export default Banner