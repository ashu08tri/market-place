import React from 'react';
import Product from '@/components/Product';

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
    <Product product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={data.mainTitle}/>
  )
}

export default page;