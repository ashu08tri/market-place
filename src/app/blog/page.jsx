export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import AddBlog from '@/components/routepages/AddBlog';

const getData = async () => {
  try {
    // Build base URL for server and client environments
    const baseUrl =
      process.env.NEXT_PUBLIC_HOST_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const url = `${baseUrl}/api/landingPage/blog`;

    const res = await fetch(url, { cache: 'no-store' }); // no-store to disable caching

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Fetch failed with response:', errorText);
      return [];
    }

    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.error('Invalid JSON returned by API:', jsonErr);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Error fetching blog data:', err);
    return [];
  }
};

async function Page() {
  const data = await getData();
  const apiUrl =
    process.env.NEXT_PUBLIC_HOST_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return (
    <div className="px-2 pt-36">
      {/* Navigation */}
      <p className="text-center text-sm py-2">
        <Link href="/">HOME</Link>
      </p>

      {/* Header */}
      <div className="h-16 text-center content-center">
        <h1 className="font-bold text-2xl">NEWS</h1>
        <AddBlog api={`${apiUrl}/api/landingPage/blog`} storageUrl="blog" />
      </div>

      {/* Section Title */}
      <div className="border-y h-16 mb-4 content-center">
        <p className="uppercase pl-10">All Articles</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.length > 0 ? (
          data.map((item, i) => (
            <Link
              href={`blog/${item._id}`}
              key={i}
              className="flex flex-col items-start justify-between group bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="w-full h-60 md:h-[330px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:opacity-75 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold group-hover:underline underline-offset-2">
                  {item.title}
                </p>
                <p className="text-xs mt-2">
                  {item.desc.slice(0, 160)}...
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs available at the moment. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
