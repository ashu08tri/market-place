import React from "react";
import Link from "next/link";
import Image from "next/image";
import CountDown from "./CountDown"; // your custom countdown
import EditCounter from "./landingPage/EditCounter";
import EditCounterSale from "./landingPage/EditCounterSale";
import shoe2 from '../../public/assets/shoe2.jpg';
import shoe3 from '../../public/assets/shoe3.jpg';

const data = [
  {
    title: "DISCOVER URBAN's,CASUAL SHOES",
    image: shoe2,
    url: ""
  },
  {
    title: "URBAN'S GENTS,SHOE COLLECTION",
    image: shoe3,
    url: ""
  }
];

function CounterSale() {
  // custom: countdown target = next midnight
  const now = new Date();
  const tomorrowMidnight = new Date();
  tomorrowMidnight.setHours(24, 0, 0, 0);

  return (
    <div className="uppercase h-[120vh] w-screen md:w-auto pb-10">
      {/* Countdown Header */}
      <div className="relative h-1/4 md:h-[20%] flex flex-col md:flex-row justify-between items-center px-12 mt-10 md:m-0 md:border-b">
        <h1 className="text-2xl md:text-3xl tracking-widest font-semibold my-4 uppercase">
          Flash Sale Ends In
        </h1>

        <div className="md:border-x border-y md:border-y-0 px-20 md:px-48 py-4 md:py-8">
          <CountDown date={tomorrowMidnight} />
        </div>

        <div className="relative">
          <Link
            href="/shop"
            className="px-10 py-4 text-sm bg-black border text-white border-black hover:bg-white hover:text-black mt-4"
          >
            Sale
          </Link>
          <EditCounter
            item={{ title: "Flash Sale Ends In", url: "/shop" }}
            api={`${process.env.NEXT_PUBLIC_HOST_URL}/api/landingPage/counter`}
          />
        </div>
      </div>

      {/* Shoes Section */}
      <div className="flex flex-col md:flex-row px-10 md:px-40 gap-2 md:gap-10 h-[80%] md:h-[65%] text-center my-20">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-cover relative bg-center h-[70vh] w-full md:w-1/2"
          >
            <Image
              unoptimized
              src={item.image}
              alt={item.title}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute top-0 flex flex-col h-full justify-end w-full items-center pb-20 gap-4">
              <p className="text-xl md:text-3xl tracking-widest text-white">
                {item.title.split(",").map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < item.title.split(",").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              <Link
                href={item.url}
                className="px-6 py-2 bg-transparent border text-white border-white hover:border-black hover:bg-black hover:text-white"
              >
                shop now
              </Link>
            </div>
            <EditCounterSale
              item={item}
              api={`${process.env.NEXT_PUBLIC_HOST_URL}/api/landingPage/counterSale`}
              storageUrl={"couterSale"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CounterSale;
