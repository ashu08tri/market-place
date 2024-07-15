import Types from "@/components/Types";

const getData = async (category) => {
  try {
    let res = await fetch('http://localhost:3000/api/types/'+category,{cache: 'no-store'});
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};


async function Page({params}) {
  const{category} = params;
  const data = await getData(category)
  

  return (
    <Types
      product={data}
      img={
        'https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440'
      }
      title={data.mainTitle}
    />
  );
}

export default Page;

