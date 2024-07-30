import React from 'react';
import Link from 'next/link';

const getData = async () => {
    try {
        let res = await fetch('http://localhost:3000/api/landingPage/blog');
        res = await res.json();
        return res;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function Page() {
    const data = await getData();

    return (
        <div className='px-2 pt-24'>
           <p className='text-center text-sm py-2'> <Link href='/'>HOME</Link></p>
            <div className='h-56 md:h-64 text-center content-center'>
                <h1 className='text-bold text-2xl'>NEWS</h1>
                
            </div>
            <div className='border-y h-16 mb-4 content-center'>
                <p className='uppercase pl-10'>All Articles</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {data.length > 0 ? data.map((item, i) => (
                    <Link href={`blog/${item._id}`} key={i} className='flex flex-col items-center justify-center gap-2 group'>
                        <img src={item.image} alt={item.title} className="object-cover w-full h-60 md:h-96 group-hover:opacity-75" />
                        <div className="flex flex-col items-start gap-1 p-4 h-full">
                            <p className="text-lg font-semibold group-hover:underline underline-offset-2">{item.title}</p>
                            <p className="text-xs">{item.desc}</p>
                        </div>
                    </Link>
                )) : <p>Failed to load data!</p>}
            </div>
        </div>
    )
}

export default Page;
