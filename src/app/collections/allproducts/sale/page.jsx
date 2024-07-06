import { allProducts } from '@/utils/data';
import Product from '@/components/Product';

const sale = allProducts.flatMap(product => product.sale || []);

function page() {
  return (
    <Product product={sale} img={"https://sahara-theme.myshopify.com/cdn/shop/collections/sale.webp?v=1675923072&width=1440"} title={'SALE'}/>
  )
}

export default page;