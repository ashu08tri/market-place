"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProductFormModal from './ProductFormModal';
import { decode } from 'jsonwebtoken';
import { Toaster, toast } from "sonner";

const getData = async (category) => {
  try {
    let res = await fetch(`http://localhost:3000/api/collections/${category}`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

function Collection({ product, img, title, category }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState(product.product);

  const { data } = useSession();

  const handleViewMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };

    useEffect(() => {
        if (data) {
            setToken(data.user.accessToken);
        }
    }, [data]);

  const closeProductFormModal = () => {
    setIsProductFormOpen(!isProductFormOpen);
  };

  const handleProductAdd = async () => {
    const updatedData = await getData(category);
    setProducts(updatedData.product);
    setIsProductFormOpen(false);
  };

  useEffect(() => {
    if (token) {
        try {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setIsAdmin(decodedToken.isAdmin);
            } 
        } catch (error) {
            console.error("Invalid token:", error);
        }
    } else {
        setIsAdmin(false);
    }
}, [token]);

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
            <li className='group'><Link href='/collections/havana' className='text-sm whitespace-nowrap group-hover:underline underline-offset-2'>Havana</Link></li>
            <li className='group'><Link href='/collections/bali_dreams' className='text-sm whitespace-nowrap px-2 py-10 border-x group-hover:underline underline-offset-2'>Bali Dreams</Link></li>
            <li className='group'><Link href='/collections/glitz_on_the_beach' className='text-sm whitespace-nowrap pr-2 py-10 border-r group-hover:underline underline-offset-2'>Glitz</Link></li>
            <li className='group'><Link href='/collections/mediterranean_love' className='text-sm whitespace-nowrap border-x group-hover:underline underline-offset-2'>Mediterranean Love</Link></li>
          </ul>
        </div>
        <p className='text-xl text-center'>{`${products.length} Products`}</p>
      </div>
      <div className='flex'>
        <div className='hidden md:flex justify-center md:w-2/12'>
          <ul className='flex flex-col justify-center gap-4 text-left h-96 sticky top-8 border-r px-16'>
            <li className='group'><Link href='/collections/havana' className='group-hover:underline underline-offset-2'>Havana</Link></li>
            <li className='group'><Link href='/collections/bali_dreams' className='group-hover:underline underline-offset-2'>Bali Dreams</Link></li>
            <li className='group'><Link href='/collections/glitz_on_the_beach' className='group-hover:underline underline-offset-2'>Glitz</Link></li>
            <li className='group'><Link href='/collections/mediterranean_love' className='group-hover:underline underline-offset-2'>Mediterranean Love</Link></li>
          </ul>
        </div>
        <div className='md:w-10/12 flex flex-wrap justify-center md:pl-8'>
          {(products.length > 10 ? products.slice(0, visibleItems) : products).map((item, i) => (
            <div key={i} className='w-1/2 md:w-1/4 px-2 mb-4 cursor-pointer' onClick={() => router.push(`/collections/${title}/${item._id}`)}>
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
      {isProductFormOpen && <ProductFormModal onClose={closeProductFormModal} maintitle={title} onProductAdd={handleProductAdd} apiRoute={`/api/collections/${title}`}
            storagePath={'productImages/collections'} method={'POST'}/>}
    </div>
  );
}

export default Collection;
