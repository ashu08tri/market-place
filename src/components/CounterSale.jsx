import CounDown from "./CountDown";

function CounterSale() {
    return (
        <div className='uppercase h-[120vh] w-screen md:w-auto pb-10'>

            <div className='h-1/4 md:h-[20%] flex flex-col md:flex-row justify-between items-center px-12 mt-10 md:m-0 md:border-b'>
                <h1 className='text-3xl tracking-widest font-semibold my-4'>HOLIDAY SEASON</h1>
                <div className="md:border-x border-y md:border-y-0 px-20 md:px-48 py-4 md:py-8">
                    <CounDown />
                </div>
                <div><button className='px-10 py-4 text-sm bg-black border text-white border-black hover:bg-white hover:text-black mt-4'>Sale</button></div>
            </div>

            <div className='flex flex-col md:flex-row px-10 md:px-40 gap-2 md:gap-10 h-[80%] md:h-[65%] text-center my-20'>
                <div className='bg-cover bg-center h-full w-full md:w-1/2' style={{ backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-116.jpg)' }}>
                    <div className='flex flex-col h-full justify-end items-center pb-8 gap-4'>
                    <p className='text-2xl tracking-widest font-semibold text-white'>SAHARA BALI <br /> SWIMWEAR COLLECTION</p>
                    <button className='px-6 py-2 bg-transparent border text-white border-white hover:bg-black hover:text-white'>shop now</button>
                    </div>
                </div>
                <div className='bg-cover bg-center h-full w-full md:w-1/2' style={{ backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/FAE_Hotel_Sages_-743.jpg)' }}>
                <div className='flex flex-col h-full justify-end items-center pb-8 gap-4'>
                    <p className='text-2xl tracking-widest font-semibold text-white'>DISCOVER SAHARA <br /> SWIMWEAR</p>
                    <button className='px-6 py-2 bg-transparent border text-white border-white hover:bg-black hover:text-white'>shop now</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CounterSale;