import React from 'react';
import Product from '@/components/Product';
import ShopAll from '@/components/ShopAll';

const getData = async(category) => {
    try{
      let res = await fetch('http://localhost:3000/api/products/'+category, {cache: 'no-store'});
      res = await res.json();
      return res;
    }catch(err){
      console.log(err);
    }
  }

async function page({params}) {
    const {category} = params;
    const data = await getData(category)
    //console.log(data);

  return (
    <>
      {category === 'shop_all' ? <ShopAll product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={'Shop All'} url={'featured'}/> : 
      <Product product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={data.mainTitle}/>}
    </>
  )
}

export default page;