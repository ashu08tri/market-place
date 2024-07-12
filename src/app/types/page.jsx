import Types from "@/components/Types";

const getData = async () => {
  try {
    let res = await fetch('http://localhost:3000/api/types',{cache: 'no-store'});
    res = await res.json();

    // Assuming `res` is an array of objects containing `bestSeller`, `sale`, `newArrival`
    let combinedProducts = [];

    res.forEach(product => {
        combinedProducts.push(...product.typefirst, ...product.typesecond, ...product.typethird, ...product.typefourth);
    });

    return combinedProducts;
  } catch (err) {
    console.log(err);
    return [];
  }
};


async function Page() {
  const combinedProducts = await getData();

  return (
    <Types
      product={combinedProducts}
      img={
        'https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440'
      }
      title={'Shop All'}
    />
  );
}

export default Page;

