"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

const CustomLeftArrow = ({ onClick }) => (
    <button
        className='hidden text-white md:block absolute left-4 p-2'
        onClick={onClick}
    >
        <HiArrowLongLeft size={40} />
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button
        className='hidden text-white md:block absolute right-4 p-2'
        onClick={onClick}
    >
        <HiArrowLongRight size={40} />
    </button>
);

function HeaderCarousel() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [mainAdmin, setMainAdmin] = useState(null);
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
        if (token) {
            try {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsAdmin(decodedToken.isAdmin);
                    setMainAdmin(decodedToken.email);
                } 
            } catch (error) {
                console.error("Invalid token:", error);
            }
        } else {
            setIsAdmin(false);
            setMainAdmin(null);
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
                infinite={true} // Ensure this is true for infinite looping
                autoPlay={true}
                autoPlaySpeed={3000}
                transitionDuration={500}
                
                removeArrowOnDeviceType={["tablet", "mobile"]}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
                dotListClass="custom-dot-list-style"
            >
                {images.length > 0 && images.map((item, i) => (
                    <div key={i} className='h-screen w-screen'>
                        <Image src={item.images} fill alt='carousel_images' style={{objectFit: 'cover'}}/>
                        {mainAdmin === 'alok@admin.com' && <button onClick={() => deleteImage(item.images)} className='p-2 absolute top-40 right-5 bg-black text-white'>Delete Image</button>}
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
