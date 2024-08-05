import React from 'react';
import Link from 'next/link';
import EditDualTile from './landingPage/EditDualTile';
import Image from 'next/image';

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/dualTile`);
    res = await res.json();
    return res;
  } catch (err) {
    console.error(err);
    return [];
  }
};

async function DualTiles() {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <div className='md:px-24 uppercase flex flex-col relative'>

          {data.map((item, index) => (
            <>


              <div
                key={index}
                className='h-[calc(100vh-6rem)] relative flex flex-col md:flex-row justify-evenly md:justify-between md:items-center px-8 md:p-0'>
                {index % 2 === 0 ? (
                  <>
                    <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest mt-12 md:my-12 gap-4'>
                      <EditDualTile item={item} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/dualTile`} storageUrl={'dualTile'} />
                      <h1 className='text-3xl' style={{ whiteSpace: 'pre-line' }}>
                        {item.title.split(',').map((part, index) => (
                          <React.Fragment key={index}>
                            {part.trim()}
                            {index < item.title.split(',').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h1>
                      <p>{item.desc}</p>
                      <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                      <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-5'>
                        <Link href={item.url}>Learn More</Link>
                      </button>
                    </div>
                    <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                      <div className='relative md:ml-10 h-full md:h-5/6 w-full md:w-8/12'>
                        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex justify-center md:w-1/2 h-1/2 md:h-full items-center'>
                      <div className='relative md:ml-10 h-full md:h-5/6 w-full md:w-8/12'>
                        <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </div>
                    <div className='text-center md:w-1/2 flex flex-col items-center justify-center tracking-widest md:my-12 gap-4'>
                      <EditDualTile item={item} api={'http://localhost:3000/api/landingPage/dualTile'} storageUrl={'dualTile'} />
                      <h1 className='text-3xl' style={{ whiteSpace: 'pre-line' }}>
                        {item.title.split(',').map((part, index) => (
                          <React.Fragment key={index}>
                            {part.trim()}
                            {index < item.title.split(',').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h1>
                      <p>{item.desc}</p>
                      <div className='hidden md:block w-[calc(.7px)] h-20 bg-gray-400 my-8'></div>
                      <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white mb-10'>
                        <Link href={item.url}>Learn More</Link>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ))}
        </div>

      ) : (
        <p>Failed to load data!</p>
      )}
    </>
  );
}

export default DualTiles;
