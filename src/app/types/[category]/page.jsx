import React from 'react';
import Types from '@/components/Types';
import ShopAll from '@/components/ShopAll';

const getData = async (category) => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/types/${category}`, { cache: 'no-store' });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

async function Page({ params }) {
  const { category } = params;
  const data = await getData(category);

  return (
    <>
      {category === 'shop_all' ? (
        <ShopAll
          product={data.products}
          categories={data.categories}
          img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'}
          title={'Shop All'}
          url={'types'}
        />
      ) : (
        <Types
          product={data.products}
          categories={data.categories}
          img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'}
          title={category}
        />
      )}
    </>
  );
}

export default Page;
