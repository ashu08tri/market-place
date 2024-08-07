import BeforeAfterSlider from "./BeforeAfterSlider";

function BeforeAfter() {
  return (
    <main className="flex flex-col md:flex-row h-[70vh] md:h-[90vh] items-center gap-6 md:justify-between px-3 md:px-20">
      <div className="w-full md:w-4/12 self-start pt-10 md:pt-24">
      <p className="text-4xl md:text-5xl tracking-widest">Our solid swimwear is produced using ECONYL®</p>
      <p className="md:text-xl pt-5 tracking-wide">Using ECONYL® instead of sourcing new nylon allows us to recycle waste materials and give them a new life.</p>
      </div>
     <div className="w-full md:w-7/12"><BeforeAfterSlider /></div>
    </main>
  )
}

export default BeforeAfter;
