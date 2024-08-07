"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowsLeftRight } from "react-icons/fa6";


function BeforeAfterSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (event) => {
        if (!isDragging) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

        setSliderPosition(percent);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                width: '100%',
                position: 'relative',
                cursor: 'pointer',
            }}
            onMouseUp={handleMouseUp}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '70 / 45',
                    overflow: 'hidden',
                    userSelect: 'none',
                }}
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseUp}
            >
                {/* Container for images */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {/* Bottom Image */}
                    <Image src="https://sahara-theme.myshopify.com/cdn/shop/files/FAEStudioCrop-113_346e848b-5ba0-43d0-a71d-4b05690677dd.jpg" alt="sliderImage" fill style={{objectFit: 'cover'}}/>
                    {/* Top Image with Clipping */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                        }}
                    >
                        <Image src="https://sahara-theme.myshopify.com/cdn/shop/products/FAEStudioCrop-113.jpg" alt="sliderImage" fill style={{objectFit: 'cover'}}/>
                    </div>
                    {/* Slider Handle */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            left: `calc(${sliderPosition}% - 1px)`,
                            zIndex: 3,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                border: '2px solid white',
                                backgroundColor: 'black',
                                borderRadius: '50%',
                                height: '45px',
                                width: '45px',
                                left: '-22px',
                                top: 'calc(50% - 22.5px)',
                                zIndex: 3,
                            }}
                        >
                            <span className="text-xl text-white"><FaArrowsLeftRight /></span>
                        </div>
                    </div>
                    {/* Bottom Left Text */}
                    <p
                        style={{
                            position: 'absolute',
                            bottom: '16px',
                            fontSize: 'large',
                            left: '16px',
                            color: 'white',
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    >
                        Image Before
                    </p>
                    {/* Bottom Right Text */}
                    <p
                        style={{
                            color: 'black',
                            fontSize: 'large',
                            position: 'absolute',
                            bottom: '16px',
                            right: '16px',
                            pointerEvents: 'none',
                            zIndex: 2,
                        }}
                    >
                        Image After
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
