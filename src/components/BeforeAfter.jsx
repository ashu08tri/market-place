import React, { Suspense } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import before from '../../public/assets/before.jpg';
import after from '../../public/assets/after.jpg';

function BeforeAfter() {
  
  return (
    <main className="relative flex flex-col md:flex-row items-center gap-6 md:justify-between px-3 md:px-20">
        <>
          <div className="w-full md:w-4/12 self-start pt-10 md:pt-24">
            <p className="text-4xl md:text-5xl tracking-widest">QUALITY MATERIAL</p>
            <p className="md:text-xl pt-5 tracking-wide">Sustainability is at the core of our brand, with a strong emphasis on using biodegradable fabrics made from natural raw materials. These bio fabrics significantly reduce environmental impact, as they break down more easily compared to synthetic materials, minimizing waste and pollution. By choosing biodegradable options, we not only lessen our carbon footprint but also contribute to a healthier ecosystem. This commitment to sustainable practices positively impacts society by promoting environmental stewardship and fostering a more sustainable future.</p>
          </div>
          <Suspense fallback={<div>Loading BeforeAfterSlider...</div>}>
            <div className="w-full md:w-7/12">
              <BeforeAfterSlider imgB={after} imgT={before} />
            </div>
          </Suspense>
        </>
    </main>
  );
}

export default BeforeAfter;
