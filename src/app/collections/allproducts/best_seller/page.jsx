import { allProducts } from '@/utils/data';
import Product from '@/components/Product';

const bestSeller = allProducts.flatMap(product => product.bestSeller || [])

function page() {
  return (
    <Product product={bestSeller} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg'} title={'Best Sellers'}/>
  )
}

export default page;