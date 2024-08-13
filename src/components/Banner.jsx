import Link from 'next/link';
import EditBanner from './landingPage/EditBanner';

const {NEXT_PUBLIC_HOST_URL} = process.env;

const getData = async() => {
  try{
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/banner`);
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
  }
}

async function Banner() {
  const data = await getData();
  return (
    <>
    {
      data.length > 0 ? data.map((item,i) => <div key={i} className='h-96 relative flex flex-col tracking-wider justify-center text-white gap-5 items-center bg-cover bg-center'>
      <img src={item.image} alt='banner' className='w-full h-full object-cover' loading='lazy'/>
      <EditBanner item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/banner`} storageUrl={'banner'}/>
     <div className='absolute text-center'>
     <p className='text-xs py-2'>{item.title}</p>
     <p className='text-4xl py-2'>{item.title2}</p>
     </div>
      <div className='flex gap-3 absolute top-[65%]'>
          <Link href={item.url} className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'>Shop New In</Link>
         <Link href={item.url2} className='px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black text-sm'>All Products</Link>
      </div>
  </div>) : <p>Failed to load data!</p>
    }
    </>
  )
}

export default Banner