"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductFormModal from './ProductFormModal';
import { decode } from 'jsonwebtoken';
import { Toaster, toast } from "sonner";

const getData = async (category) => {
  try {
    let res = await fetch(`http://localhost:3000/api/types/${category}`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

function Types({ product, img, title, category }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [products, setProducts] = useState(product.product);

  const handleViewMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAdmin(decodedToken.isAdmin);
        } else {
          localStorage.removeItem('token');
          setToken(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
      }
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const closeProductFormModal = () => {
    setIsProductFormOpen(!isProductFormOpen);
  };

  const handleProductAdd = async () => {
    const updatedData = await getData(category);
    setProducts(updatedData.product);
    toast.success('Product list updated');
    setIsProductFormOpen(false);
  };

  return (
    <div className='pt-24'>
      <Toaster closeButton position="bottom-right" />
      <div className='h-80 relative'>
        <img
          src={img}
          alt="img"
          className='h-full w-full object-cover'
        />
        <p className='text-white text-2xl uppercase font-semibold md:text-4xl tracking-wider absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[100%]'>
          {title.replace(/_/g, ' ')}
        </p>
      </div>

      <div className='p-8 border-y flex flex-col justify-center gap-6 items-center'>
        <div className='md:hidden border-b pb-10'>
          <ul className='flex justify-center gap-2 text-left'>
            <li className='group'><Link href='/types/one_piece_swimsuits' className='text-sm whitespace-nowrap group-hover:underline underline-offset-2'>One-piece</Link></li>
            <li className='group'><Link href='/types/two_piece_swimsuits' className='text-sm whitespace-nowrap px-2 py-10 border-x group-hover:underline underline-offset-2'>Two-piece</Link></li>
            <li className='group'><Link href='/types/bikini_tops' className='text-sm whitespace-nowrap pr-2 py-10 border-r group-hover:underline underline-offset-2'>Bikini Tops</Link></li>
            <li className='group'><Link href='/types/bikini_bottoms' className='text-sm whitespace-nowrap border-x group-hover:underline underline-offset-2'>Bikini Bottoms</Link></li>
          </ul>
        </div>
        <p className='text-xl text-center'>{`${product.product.length} Products`}</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex justify-center md:w-2/12'>
          <ul className='flex flex-col justify-center gap-4 text-left h-96 sticky top-8 border-r px-16'>
            <li className='group'><Link href='/types/one_piece_swimsuits' className='group-hover:underline underline-offset-2'>One-piece</Link></li>
            <li className='group'><Link href='/types/two_piece_swimsuits' className='group-hover:underline underline-offset-2'>Two-piece</Link></li>
            <li className='group'><Link href='/types/bikini_tops' className='group-hover:underline underline-offset-2'></Link>Bikini Tops</li>
            <li className='group'><Link href='/types/bikini_bottoms' className='group-hover:underline underline-offset-2'>Bikini Bottoms</Link></li>
          </ul>
        </div>
        <div className='md:w-10/12 flex flex-wrap justify-center md:pl-8'>
          {(products.length > 10 ? products.slice(0, visibleItems) : products).map((item, i) => (
            <div key={i} className='w-1/2 md:w-1/4 px-2 mb-4 cursor-pointer' onClick={() => router.push(`/types/${title}/${item._id}`)}>
              <div className='rounded overflow-hidden shadow-lg'>
              <div className='flex justify-center'>
                  <img className='h-64 w-56 object-cover' src={item.img[0]} alt={item.title} />
                  </div>
                <div className='px-6 py-4'>
                  <p className='font-bold text-xl mb-2'>{item.title}</p>
                  <p className='text-gray-700 text-base'>{item.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleItems < products.length && (
        <div className='flex justify-center mt-4'>
          <button
            className='bg-black text-white px-4 py-2'
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
      {isAdmin && (
        <div className='absolute top-40 p-5'>
          <button className='bg-black text-white p-3' onClick={closeProductFormModal}>Add Product</button>
        </div>
      )}
      {isProductFormOpen && <ProductFormModal onClose={closeProductFormModal} maintitle={title} onProductAdd={handleProductAdd} apiRoute={`/api/types/${title}`}
            storagePath={'productImages/types'}/>}
    </div>
  );
}

export default Types;

