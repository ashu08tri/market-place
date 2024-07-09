import Product from '@/components/Product';

const getData = async() => {
  try{
    let res = await fetch('http://localhost:3000/api/products/sale');
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function page() {
  const sale = await getData();
  return (
    <Product product={sale} img={"https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440"} title={'SALE'}/>
  )
}

export default page;