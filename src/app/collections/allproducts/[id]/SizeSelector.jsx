"use client"
import { useState } from "react";
import { CiStopwatch } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";


function SizeSelector({ sizes }) {
    
    const [selected, setSelected] = useState('M');
    const [quantity, setQuantity] = useState(1);

    const selectHandler = (size) => {
        setSelected(size);
        setQuantity(1); 
    }

    const quantityIncHandler = () => {
        const selectedSizeObj = sizes.find(sizeObj => sizeObj.size === selected);
        if (quantity < selectedSizeObj.quantity) {
            setQuantity(prev => prev + 1);
        }
    }

    const quantityDecHandler = () => {
        setQuantity(prev => prev - 1);
    }

    const carthandler = () => {
        // cart logic
    }

    let selectedSizeObj = sizes.find(sizeObj => sizeObj.size === selected);
    let sizeQuantity = selectedSizeObj.quantity

    return (
        <div className="border-b pb-10 md:pb-20">
            <ul className='flex gap-3'>
                {sizes.map((sizeObj, i) => (
                    <li 
                        key={i} 
                        className='px-3 py-1 border cursor-pointer hover:bg-gray-300' 
                        style={{
                            backgroundColor: selected === sizeObj.size ? 'gray' : '',
                            color: selected === sizeObj.size ? 'white' : ''
                        }}
                        onClick={() => selectHandler(sizeObj.size)}
                    >
                        {sizeObj.size}
                    </li>
                ))}
            </ul>
            <div className="md:flex items-center gap-2 md:py-4">
                <div className="flex border w-full md:w-1/4 h-12 items-center my-4 justify-between">
                    <button 
                        onClick={quantityDecHandler} 
                        className="w-14 p-4 text-xl" 
                        disabled={quantity === 1}
                        style={{color: quantity===1 ? 'gray' : 'black'}}
                    >
                        -
                    </button>
                    <p className="flex-grow text-center text-xl">{quantity}</p>
                    <button 
                        onClick={quantityIncHandler} 
                        className="w-14 p-4 text-xl" 
                        disabled={quantity >= sizes.find(sizeObj => sizeObj.size === selected).quantity}
                        style={{color: quantity >= sizes.find(sizeObj => sizeObj.size === selected).quantity ? 'gray' : 'black'}}
                    >
                        +
                    </button>
                </div>
                <div className="h-12 w-full">
                    <button 
                        onClick={carthandler} 
                        className="p-3 md:p-2 w-full text-xl border border-black bg-black text-white hover:bg-white hover:text-black"
                    >
                        Add to cart
                    </button>
                </div>
                
            </div>
                <div className="pt-4 md:p-0">
                <p className="mt-4 text-sm flex items-center gap-1"><span className="text-xl"><CiStopwatch /></span>Only {sizeQuantity} left in stock for selected size, Order soon.</p>
                <p className="mt-4 text-sm flex items-center gap-1"><span className="pl-1"><IoCheckmark /></span>Free delivery and shipping</p>
                <p className="mt-4 text-sm flex items-center gap-1"><span className="pl-1"><IoCheckmark /></span>Secure online payment</p>
                </div>
        </div>
    )
}

export default SizeSelector;
