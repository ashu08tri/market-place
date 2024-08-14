import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const EditDualTile = React.lazy(() => import('./landingPage/EditDualTile'));

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/dualTile`, {cache: 'no-store'});
    res = await res.json();
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Update DualTiles component with lazy loading
async function DualTiles() {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className='md:px-24 flex flex-col relative'>
          {data.map((item, index) => (
            <div
              key={index}
              className='h-[65vh] md:h-[calc(100vh-6rem)] relative flex flex-col md:flex-row justify-evenly md:justify-between md:items-center px-8 md:p-0'
            >
              {index % 2 === 0 ? (
                <>
                  <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest mt-12 md:my-12 gap-4'>
                    <Suspense fallback={<div>Loading EditDualTile...</div>}>
                      <EditDualTile item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/dualTile`} storageUrl={'dualTile'} />
                    </Suspense>
                    <h1 className='text-2xl md:text-3xl uppercase' style={{ whiteSpace: 'pre-line' }}>
                      {item.title.split(',').map((part, index) => (
                        <React.Fragment key={index}>
                          {part.trim()}
                          {index < item.title.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h1>
                    <p className='uppercase'>{item.desc}</p>
                    <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                    <Link href={item.url} className='px-10 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-5'>
                      Learn More
                    </Link>
                  </div>
                  <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                    <div className='relative md:ml-10 h-full md:h-5/6 w-full md:w-8/12'>
                    <Image src={item.image} alt={item.title} fill style={{objectFit: 'cover'}} unoptimized/>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                    <div className='relative md:ml-10 h-full md:h-5/6 w-full md:w-8/12'>
                    <Image src={item.image} alt={item.title} fill style={{objectFit: 'cover'}} unoptimized/>
                    </div>
                  </div>
                  <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest md:my-12 gap-4'>
                    <Suspense fallback={<div>Loading EditDualTile...</div>}>
                      <EditDualTile item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/dualTile`} storageUrl={'dualTile'} />
                    </Suspense>
                    <h1 className='text-2xl md:text-3xl uppercase' style={{ whiteSpace: 'pre-line' }}>
                      {item.title.split(',').map((part, index) => (
                        <React.Fragment key={index}>
                          {part.trim()}
                          {index < item.title.split(',').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h1>
                    <p className='uppercase'>{item.desc}</p>
                    <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                    <Link href={item.url} className='px-10 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-5'>
                      Learn More
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Failed to load data!</p>
      )}
    </>
  );
}

export default DualTiles;
