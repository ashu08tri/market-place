import Link from 'next/link';
import ImageSlider from './ImageSlider';

const getMission = async () => {
  try{
    let res = await fetch('http://localhost:3000/api/landingPage/ourmission');
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
    return null;
  }
};

const getBlog = async () => {
  try{
    let res = await fetch('http://localhost:3000/api/landingPage/blog');
    res = await res.json();
    return res;
  }catch(err){
    console.log(err);
    return null;
  }
}

async function MissionnNews() {
  const mission = await getMission();
  const items = await getBlog();

  return (
    <div className='px-8 md:px-20 h-[160vh] mt-32 md:mt-10'>
     {mission &&
       <div className='flex flex-col justify-center px-8 py-10 items-center bg-yellow-50 text-center h-3/6 md:h-2/6'>
       <div className='md:w-4/6'>
         <h3 className='text-2xl font-semibold py-2'>{mission[0].title}</h3>
         <p>{mission[0].desc}</p>
       </div>
     </div>
     }

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
