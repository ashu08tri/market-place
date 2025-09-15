import React from 'react';
import Types from '@/components/Types';
import ShopAll from '@/components/ShopAll';

const {NEXT_PUBLIC_HOST_URL} = process.env;

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
  const imgSrc = data?.banner || '/no-pictures.png';

  return (
    <>
      {category === 'shop_all' ? (
        <ShopAll
          product={data.products}
          categories={data.categories}
          img="https://fra.cloud.appwrite.io/v1/storage/buckets/66baf56e003b65dd4be1/files/68b3df30003aa0d50c5c/view?project=66baf406000f81a719ca"
          title={'Shop All'}
          url={'types'}
        />
      ) : (
        <Types
          product={data.products}
          categories={data.categories}
          img={imgSrc}
          title={category}
        />
      )}
    </>
  );
}

export default Page;
