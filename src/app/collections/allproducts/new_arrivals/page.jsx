import { allProducts } from '@/utils/data';
import Product from '@/components/Product';

const newArrival = allProducts.flatMap(product => product.newArrival || [])

function page() {
  return (
    <Product product={newArrival} img={'https://sahara-theme.myshopify.com/cdn/shop/collections/FAE_-6-min.jpg'} title={'New Arrivals'}/>
  )
}

export default page;