"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Product({ product, img, title }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);

  const handleViewMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };

  return (
    <div className='pt-24'>
      <div className='h-80 relative'>
        <img
          src={img}
          alt="img"
          className='h-full w-full object-cover'
        />
        <p className='text-white text-2xl  uppercase font-semibold md:text-4xl tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100%]'>
          {title}
        </p>
      </div>

      <div className='p-8 border-y flex flex-col justify-center gap-6 items-center'>
        <div className='md:hidden border-b pb-10'>
          <ul className='flex justify-center gap-2 text-left'>
            <li className='group'><Link href='/collections/allproducts/sale' className='text-sm whitespace-nowrap group-hover:underline underline-offset-2'>Sale</Link></li>
            <li className='group'><Link href='/collections/allproducts/new_arrivals' className='text-sm whitespace-nowrap px-2 py-10 border-x group-hover:underline underline-offset-2'>New Arrivals</Link></li>
            <li className='group'><Link href='/collections/allproducts/best_seller' className='text-sm whitespace-nowrap pr-2 py-10 border-r group-hover:underline underline-offset-2'>Summer Wear</Link></li>
            <li className='group'><Link href='/collections/allproducts' className='text-sm whitespace-nowrap border-x group-hover:underline underline-offset-2'>Shop All</Link></li>
          </ul>
        </div>
        <p className='text-xl text-center'>{`${product.length} Products`}</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex justify-center md:w-2/12'>
          <ul className='flex flex-col justify-center gap-4 text-left h-96 sticky top-8'>
            <li className='group'><Link href='/collections/allproducts/sale' className='group-hover:underline underline-offset-2'>Sale</Link></li>
            <li className='group'><Link href='/collections/allproducts/new_arrivals' className='group-hover:underline underline-offset-2'>New Arrivals</Link></li>
            <li className='group'><Link href='/collections/allproducts/best_seller' className='group-hover:underline underline-offset-2'>Summer Wear</Link></li>
            <li className='group'><Link href='/collections/allproducts' className='group-hover:underline underline-offset-2'>Shop All</Link></li>
          </ul>
        </div>
        <div className='md:w-10/12 flex flex-wrap justify-center md:pl-8'>
          {(product.length > 10 ? product.slice(0, visibleItems) : product).map((item, i) => (
            <div key={i} className='w-1/2 md:w-1/4 px-2 mb-4' onClick={() => router.push(`/types/${item._id}`)}>
              <div className='rounded overflow-hidden shadow-lg'>
                <img className='h-64 w-56 object-cover' src={item.img[0]} alt={item.title} />
                <div className='px-6 py-4'>
                  <p className='font-bold text-xl mb-2'>{item.title}</p>
                  <p className='text-gray-700 text-base'>{item.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleItems < product.length && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-black text-white px-4 py-2'
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
