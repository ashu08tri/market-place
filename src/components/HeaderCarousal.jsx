"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Carousel from 'react-multi-carousel';
import app from '@/firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import FormModal from './FormModal';
import 'react-multi-carousel/lib/styles.css';
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import { decode } from 'jsonwebtoken';
import { Toaster, toast } from 'sonner';

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
        <div className="text-white px-6 carousel-button-group absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
            <button
                onClick={() => previous()}
                style={{ background: 'none', border: 'none', display: currentSlide === 0 ? 'none' : '' }}
            >
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
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);

    const { data } = useSession();

    useEffect(() => {
        if (data) {
            setToken(data.user.accessToken);
        }
    }, [data]);

    const closeFormModal = () => {
        setIsFormOpen(!isFormOpen);
    };

    const fetchImages = async () => {
        let res = await fetch('/api/updates/carousel', { cache: 'no-store' });
        res = await res.json();
        setImages(res);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAdmin(decodedToken.isAdmin);
                } 
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsAdmin(false);
        }
    }, [token]);

    const deleteImage = async (imageURL) => {
        if (!imageURL) {
            toast.error('No image URL provided!');
            return;
        }

        const storage = getStorage(app);
        const storageRef = ref(storage, imageURL);

        try {
            // Delete image from Firebase Storage
            await deleteObject(storageRef);

            // Delete image URL from the database
            let res = await fetch('/api/updates/carousel', {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ imageURL })
            });
            res = await res.json();
            if (res.ok) {
                toast.success('Image deleted!');
                fetchImages();
            }
        } catch (err) {
            toast.error('Failed to delete image!');
            console.log(err);
        }
    };

    return (
        <div className='h-screen relative'>
            <Toaster closeButton position="bottom-right" />
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
                {images.length > 0 && images.map((item, i) => (
                    <div key={i} className='h-screen w-screen bg-cover bg-center flex items-end p-10' style={{ backgroundImage: `url(${item.images})` }}>
                        {isAdmin && <button onClick={() => deleteImage(item.images)} className='p-2 bg-black text-white'>Delete Image</button>}
                    </div>
                ))}

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
            </Carousel>
            {isAdmin && (
                <div className='absolute top-40 p-5'>
                    <button className='bg-black text-white p-3' onClick={closeFormModal}>Add Image</button>
                </div>
            )}
            {isFormOpen && <FormModal onClose={closeFormModal} onImageUpload={fetchImages} />}
        </div>
    );
}

export default HeaderCarousel;
