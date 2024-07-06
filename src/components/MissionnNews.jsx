import React from 'react';
import ImageSlider from './ImageSlider';

const items = [
  {
    src: "https://sahara-theme.myshopify.com/cdn/shop/articles/3-min.jpg",
    title: "The Perfect Black Bikini",
    description: "As summer approaches, there's one fashion staple that never goes out of style: the black bikini. Versatile, timeless, and eternally chic, the black bikini is a must-have in ev...",
  },
  {
    src: "https://sahara-theme.myshopify.com/cdn/shop/articles/2-min.jpg",
    title: "Your Beach Essentials",
    description: "Whether you're planning a beach day with friends or a solo vacation, it's important to be prepared. Here are some essential items to pack before heading to the beach!",
  },
  {
    src: "https://sahara-theme.myshopify.com/cdn/shop/articles/1-min.jpg",
    title: "Sahara Swimwear",
    description: "Welcome to Sahara Swimwear – the perfect beachwear for those hot summer days! Whether you’re looking for a classic one-piece or a trendy bikini, Sahara Swimwear",
  },
  {
    src: "https://sahara-theme.myshopify.com/cdn/shop/articles/FAE_BrentBielmann0080-min.jpg",
    title: "Our New Collection: Havana Tropical",
    description: "Introducing the newest collection of women's swimwear from Sahara, the Havana Tropical line! Get ready to be transported to a sunny paradise with this vibrant and stylish swimwe...",
  },
  {
    src: "https://sahara-theme.myshopify.com/cdn/shop/articles/FAE_Hotel_Sages_-717_3_-min.jpg",
    title: "Sustainable Swimwear",
    description: "Sustainable swimwear has become an increasingly popular topic in recent years, as the fashion industry has become more aware of the sustainability issues surrounding the",
  },
];

function MissionnNews() {
  return (
    <div className='px-8 md:px-20 h-[160vh] mt-32 md:mt-10'>
      <div className='flex flex-col justify-center px-8 py-10 items-center bg-yellow-50 text-center h-3/6 md:h-2/6'>
        <div className='md:w-4/6'>
          <h3 className='text-2xl font-semibold py-2'>OUR MISSION</h3>
          <p>Escape to sunnier days with Sahara, the sustainable swimwear brand that brings together fashion, function, and sustainability. Our collection features beautiful images of confident models rocking our chic and stylish swimsuits, all while enjoying the summer vibes. But our brand is about more than just looking good – it's about doing good, too. That's why we use eco-friendly materials and ethical production practices to create swimsuits that not only make a statement, but also make a difference. Whether you're hitting the beach or the pool, Sahara has the perfect swimsuit for you. So dive in and join us in making a positive impact on the planet, one swimsuit at a time.</p>
        </div>
      </div>

      <div className='py-10'>
        <div className='py-6 flex justify-between'>
          <h1 className='text-3xl font-semibold uppercase'>News</h1>
          <div className='hidden md:block'>
            <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Visit Blog</button>
          </div>
        </div>

        <ImageSlider items={items} />

        <div className='md:hidden flex justify-center my-8'>
          <button className='px-12 py-3 tracking-wide text-sm border border-black hover:bg-black hover:text-white uppercase'>Visit Blog</button>
        </div>
      </div>
    </div>
  );
}

export default MissionnNews;
