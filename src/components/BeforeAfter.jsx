import React, { Suspense } from 'react';
const BeforeAfterSlider = React.lazy(() => import('./BeforeAfterSlider'));
const EditBeforeAfter = React.lazy(() => import('./landingPage/EditBeforeAfter'));

const { NEXT_PUBLIC_HOST_URL } = process.env;

const getData = async () => {
  try {
    let res = await fetch(`${NEXT_PUBLIC_HOST_URL}/api/landingPage/beforeAfter`, {cache: 'no-store'});
    res = await res.json();
    return res;  
  } catch (err) {
    console.log(err);
    return [];
  }
};

async function BeforeAfter() {
  const data = await getData();
  
  return (
    <main className="relative flex flex-col md:flex-row h-[70vh] md:h-[90vh] items-center gap-6 md:justify-between px-3 md:px-20">
      <Suspense fallback={<div>Loading EditBeforeAfter...</div>}>
        <EditBeforeAfter item={data[0]} api={`${NEXT_PUBLIC_HOST_URL}/api/landingPage/beforeAfter`} storageUrl={'before-after'} />
      </Suspense>
      {data.length > 0 ? (
        <>
          <div className="w-full md:w-4/12 self-start pt-10 md:pt-24">
            <p className="text-4xl md:text-5xl tracking-widest">{data[0].title}</p>
            <p className="md:text-xl pt-5 tracking-wide">{data[0].desc}</p>
          </div>
          <Suspense fallback={<div>Loading BeforeAfterSlider...</div>}>
            <div className="w-full md:w-7/12">
              <BeforeAfterSlider imgB={data[0].imageB} imgT={data[0].imageT} />
            </div>
          </Suspense>
        </>
      ) : (
        <p>Failed to load data!</p>
      )}
    </main>
  );
}

export default BeforeAfter;
