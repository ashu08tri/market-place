import Product from '@/components/Product';

const getData = async() => {
  try{
    let res = await fetch('http://localhost:3000/api/products/new_arrivals');
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function page() {
  const newArrival = await getData();
  return (
    <Product product={newArrival} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/FAE_-6-min.jpg'} title={'New Arrivals'}/>
  )
}

export default page;