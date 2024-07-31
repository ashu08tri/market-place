import React from 'react'

function page() {
    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          {/* First Section */}
          <section className="bg-[#f5ebdf] flex flex-col items-center text-center py-12">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-sm font-normal">
                AUSTRALIAN SWIMWEAR BRAND
              </span>
              <span className="text-4xl font-serif">
                THANK YOU FAE 🖤
              </span>
              <span className="text-lg font-serif font-normal">
                We would like to give a special shout-out to FAE for allowing us to use their incredible content for our Sahara theme.
              </span>
              <span className="text-lg font-serif font-normal">
                Follow @FAE on Instagram and visit their website via this link.
              </span>
              <span className="text-lg font-serif font-normal">---</span>
              <span className="text-lg font-serif font-normal">
                Sahara theme is made with 🖤 by Shopify agency DigiFist.
              </span>
              <button className="block mx-auto mt-12 py-2 px-6 bg-black text-white text-lg font-bold rounded-md border border-black transition-colors duration-300 hover:bg-white hover:text-gray-700">
                View More
              </button>
            </div>
            <div className="relative mt-8">
              <img
                src="https://sahara-theme.myshopify.com/cdn/shop/files/faestory.jpg?v=1674920320&width=2160"
                alt="FAE Story"
                className="w-full max-w-[1000px] mx-auto"
              />
            </div>
          </section>
    
          {/* Second Section */}
          <section className="my-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-serif font-bold text-center bg-white py-4">
                FAE'S STORY
              </h1>
              <h2 className="text-lg text-gray-600 font-serif text-center">
                FAE started as a love story between founders Bianca and Adam Bennetts, who met in Bali in 2015. A holiday romance quickly turned into a forever kind of love, and as they planned their future they realised they shared a similar vision in the fashion world.
              </h2>
              <div className="h-4 bg-gray-200"></div>
              <h2 className="text-lg text-gray-600 font-serif text-center">
                Bianca and Adam started chatting business plans over cocktails in the Bali sun, with a focus on creating high-end yet sustainable swimwear. Bianca began designing bikinis in their villa in Seminyak, countless samples were produced in Denpasar, and before too long they realised they were onto a special product worthy of taking to the world. FAE was born.
              </h2>
              <div className="h-4 bg-gray-200"></div>
              <h2 className="text-lg text-gray-600 font-serif text-center">
                Now worn and loved by beachgoers and celebrities worldwide, FAE established its name quickly, with every range more progressive than the one before and the Essence of FAE apparent in every piece. Each collection has been carefully curated to blend, so FAE girls can mix-and-match their favourite pieces and can pair block-coloured separates with carefully-curated prints.
              </h2>
              <div className="h-4 bg-gray-200"></div>
              <h2 className="text-lg text-gray-600 font-serif text-center">
                Bianca delves into the past with her inspiration pulled from the '80s and '90s, but never forgets FAE's place as a forward-thinking brand of the future. Sustainability, durability and luxury are always at the front of her mind when choosing the highest quality Italian fabrics.
              </h2>
              <div className="h-4 bg-gray-200"></div>
              <h2 className="text-lg text-gray-600 font-serif text-center">
                After eight years the FAE team remains tight with Bianca working as Creative Director and Adam as CEO, while the Bennetts clan continues to grow, with six-year-old Ziggy recently joined by baby sister Honey.
              </h2>
            </div>
          </section>
        </div>
      );
}

export default page