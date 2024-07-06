import { allProducts } from '@/utils/data';
import Product from '@/components/Product';

function page() {

  const combinedProducts = [
    ...allProducts[0].sale,
    ...allProducts[1].bestSeller,
    ...allProducts[2].newArrival
  ];

  return (
    <Product product={combinedProducts} img={"https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440"} title={'Shop All'}/>
  );
}

export default page;
