import Collection from "@/components/Collection";

const getData = async() => {
  try{
    let res = await fetch('http://localhost:3000/api/collections/item1',{cache: 'no-store'});
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function page() {
  const sale = await getData();
  return (
    <Collection product={sale} img={"https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440"} title={'TYPE 1'}/>
  )
}

export default page;