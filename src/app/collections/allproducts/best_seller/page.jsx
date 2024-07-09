import Product from '@/components/Product';

const getData = async() => {
  try{
    let res = await fetch('http://localhost:3000/api/products/best_seller', {cache: 'no-store'});
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function page() {
  const bestSeller = await getData();
  return (
    <Product product={bestSeller} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={'Best Sellers'}/>
  )
}

export default page;