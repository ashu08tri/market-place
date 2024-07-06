"use client"
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

const ButtonGroup = ({ next, previous, ...rest }) => {
    const {
        carouselState: { currentSlide }
    } = rest;
    return (
        <div className=" text-white px-6 carousel-button-group absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
            <button onClick={() => previous()} style={{ background: 'none', border: 'none', display:currentSlide === 0 ? 'disable' : '' }}>
                <HiArrowLongLeft size={40} />
            </button>
            <button onClick={() => next()}>
                <HiArrowLongRight size={40} />
            </button>
        </div>
    );
};

function HeaderCarousel() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Update the state based on window width
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        // Initialize state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='h-screen relative'>
        <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={500}
            arrows={false}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            customButtonGroup={isDesktop ? <ButtonGroup /> : null}
        >
            <div className='h-screen w-screen bg-cover bg-center' style={{ backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/files/fae_-47-min.jpg)' }} />
            <div className='h-screen w-screen'>
                <video 
                    src="https://sahara-theme.myshopify.com/cdn/shop/videos/c/vp/58b76d3b993a49dda787c082767e6ecf/58b76d3b993a49dda787c082767e6ecf.HD-1080p-4.8Mbps-12867843.mp4?v=0"
                    muted
                    playsInline
                    autoPlay
                    loop
                    className='h-full w-full object-cover'
                ></video>
            </div>
            <div className='h-screen w-screen bg-cover bg-center' style={{ backgroundImage: 'url(https://sahara-theme.myshopify.com/cdn/shop/collections/duo.jpg)' }} />
        </Carousel>
    </div>
    
    );
}

export default HeaderCarousel;
