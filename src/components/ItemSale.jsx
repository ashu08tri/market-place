import React from 'react'

function ItemSale() {
  return (
    <div className='h-screen uppercase md:flex text-white gap-1 tracking-wider'>
        <div className='bg-cover bg-center h-3/4 md:h-full w-full md:w-1/2 flex flex-col gap-5 justify-end items-center pb-12' style={{backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-307-min.jpg)'}}>
            <p className='text-3xl font-semibold'>MEDITERRANEAN LOVE</p>
            <div><button className='border border-white bg-transparent hover:bg-white hover:text-black px-8 py-3'>Shop Our Collection</button></div>
        </div>
        <div className='bg-teal-100 h-1/4 md:h-full w-full md:w-1/2 flex flex-col text-black items-center justify-center gap-4'>
        <p className='text-3xl md:pt-24'>ON SALE ITEMS</p>
        <p className='text-xl'>Discover our on sale items now.</p>
        <button className='border border-black bg-transparent hover:bg-black hover:text-white px-8 py-3 transition ease-in delay-50'>SHOP SALE</button>
        </div>
    </div>
  )
}

export default ItemSale;