import Link from 'next/link';
import ImageSlider from './ImageSlider';

const getBlog = async () => {
  try{
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/blog`);
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
    return null;
  }
}

async function MissionnNews() {
  const items = await getBlog();

  return (
    <div className='px-8 md:px-20 h-[160vh] mt-32 md:mt-10'>
      
       <div className='flex flex-col justify-center px-8 py-10 items-center bg-yellow-50 text-center h-3/6 md:h-2/6'>
       <div className='md:w-3/4'>
         <h3 className='text-3xl font-semibold py-6'>OUR MISSION</h3>
         <p>At GOLDEN GHAF, our mission is to redefine fashion by providing high-quality, stylish, and sustainable clothing that caters to diverse tastes and lifestyles. We believe in empowering our customers to express their unique identities through fashion while making a positive impact on the environment. Our commitment to ethical practices, innovative designs, and exceptional customer service drives us to create a shopping experience that is both enjoyable and responsible. Join us on our journey to transform the fashion industry, one stylish step at a time.</p>
       </div>
     </div>
  

      <div className='py-10'>
        <div className='py-6 flex justify-between'>
          <h1 className='text-3xl font-semibold uppercase'>News</h1>
          <div className='hidden md:block'>
            <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/blog'>Visit Blog</Link></button>
          </div>
        </div>

        <ImageSlider items={items} />

        <div className='md:hidden flex justify-center my-8'>
          <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'><Link href='/blog'>Visit Blog</Link></button>
        </div>
      </div>
    </div>
  );
}

export default MissionnNews;
