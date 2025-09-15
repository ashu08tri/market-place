import Link from 'next/link';
import Image from 'next/image';
import collection1 from '../../public/assets/collection1.webp';
import collection2 from '../../public/assets/collection2.webp';
import collection3 from '../../public/assets/collection3.webp';

const data = [
    {
        image: collection1,
        title: 'Shirts',
        url: '/types/shirts'
    },
    {
        image: collection2,
        title: 'Blazer',
        url: '/types/blazers'
    },
    {
        image: collection3,
        title: 'Bottoms',
        url: '/types/bottoms'
    },
]

async function OurCollections() {

    return (
        <div className='h-screen px-12 md:px-24 py-10'>
            {data.length > 0 ? (
                <>
                    <div className='py-10 flex justify-between relative'>
                        <h1 className='text-3xl font-semibold uppercase'>Our Collections</h1>
                        <div className='hidden md:block'>
                            <Link href='/types/shop_all' className='px-12 py-4 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Explore All</Link>
                        </div>
                    </div>
                    <div className='w-full h-3/4 overflow-x-scroll md:overflow-x-auto scrollbar-hide'>
                        <div className='h-full flex w-[calc(200vw)] gap-1 md:w-full justify-center text-center text-white'>
                            {data.map((item, i) =>
                                <div
                                    key={i}
                                    className="relative h-full w-full group flex flex-col justify-end transform hover:translate-y-0 transition-transform duration-300 ease-in-out"
                                >
                                    <Image src={item.image} alt={item.title} fill objectFit="cover" unoptimized />
                                    <div className="pb-10 absolute left-1/2 transform -translate-x-1/2 group-hover:pb-20 text-center">
                                        <p className="text-xl">{item.title}</p>
                                        <Link href={item.url} className="py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 group-hover:-translate-y-2">
                                            Explore
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='md:hidden flex justify-center my-8'>
                        <Link href='/types/shop_all' className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Explore All</Link>
                    </div>
                </>
            ) : <p>Problem loading data from backend.</p>}
        </div>
    );
}

export default OurCollections;
