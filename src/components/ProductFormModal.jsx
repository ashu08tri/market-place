"use client";
import { useState, useEffect } from "react";
import app from "@/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

function ProductFormModal({ onClose, apiRoute, storagePath, maintitle, method,
    titles, amounts, sizes, img
}) {
    const [title, setTitle] = useState(titles || '');
    const [amount, setAmount] = useState(amounts || '');
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        // Define all possible sizes
        const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

        // Create an initial quantity state based on the sizes prop
        const initialQuantity = allSizes.map(size => ({
            size,
            quantity: sizes && sizes.find(s => s.size === size) ? sizes.find(s => s.size === size).quantity : 0
        }));

        setQuantity(initialQuantity);
    }, [sizes]);

    const handleQuantityChange = (size, value) => {
        const updatedQuantity = quantity.map(q =>
            q.size === size ? { ...q, quantity: value } : q
        );
        setQuantity(updatedQuantity);
    };

    const handleImageChange = (files) => {
        setImages(Array.from(files));
    };

    const uploadImageToFirebase = async (file) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `${storagePath}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);
    
        try {
            const uploadedImageUrls = await Promise.all(Array.from(images).map(img => uploadImageToFirebase(img)));
    
            const productData = {
                maintitle,
                product: [{
                    title,
                    quantity: { size: quantity },
                    amount: Number(amount),
                    img: uploadedImageUrls.length > 0 ? uploadedImageUrls : img || []
                }]
            };
    
            let res = await fetch(apiRoute, {
                method: method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(method === 'POST' ? productData : productData.product[0])
            });
    
            res = await res.json();
    
            if (res.ok) {
                toast.success('Operation Successful!');
                onClose();
            } else {
                toast.error('Operation Failed!');
            }
        } catch (err) {
            toast.error('Operation Failed!');
            console.log(err);
        } finally {
            setUploading(false);
        }
    };
    

    return (
        <div className="absolute top-20 left-40 p-4 bg-white border border-black rounded-md text-black mt-10">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-black text-xl font-bold"
            >
                x
            </button>
            <Toaster closeButton position="bottom-right" />
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
                <label htmlFor="title" className="text-black font-semibold">Title:</label>
                <input
                    type="text"
                    className="border border-black p-2 rounded-md"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="amount" className="text-black font-semibold">Amount:</label>
                <input
                    type="number"
                    className="border border-black p-2 rounded-md"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <label className="text-black font-semibold">Quantity:</label>
                {quantity.map((q) => (
                    <div key={q.size} className="flex gap-2 mb-2">
                        <span className="border border-black p-1 rounded-md flex-1">{q.size}</span>
                        <input
                            type="number"
                            className="border border-black p-1 rounded-md flex-1"
                            placeholder="Quantity"
                            value={q.quantity}
                            onChange={(e) => handleQuantityChange(q.size, e.target.value)}
                        />
                    </div>
                ))}

                <label className="text-black font-semibold">Images:</label>
                <input
                    type="file"
                    className="border border-black p-1 rounded-md"
                    multiple
                    onChange={(e) => handleImageChange(e.target.files)}
                />

                <button
                    type="submit"
                    className='bg-black text-white py-2 px-4 mt-2 rounded-md hover:bg-gray-800 transition'
                    disabled={uploading}
                >
                    {uploading ? <BeatLoader loading={uploading} size={10} color='white' aria-label="Loading Spinner" data-testid="loader" /> : 'Proceed'}
                </button>
            </form>
        </div>
    );
}

export default ProductFormModal;
