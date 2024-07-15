import React from 'react';
import Collection from '@/components/Collection';

const getData = async(category) => {
    try{
      let res = await fetch('http://localhost:3000/api/collections/'+category, {cache: 'no-store'});
      res = await res.json();
      return res;
    }catch(err){
      console.log(err);
    }
  }

async function page({params}) {
    const {category} = params;
    const data = await getData(category)
    console.log(data);

  return (
    <Collection product={data} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={data.mainTitle}/>
  )
}

export default page;