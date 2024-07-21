"use client";
import { useState } from "react";
import app from "@/firebase"; // Ensure this path points to your Firebase configuration
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

function ProductFormModal({ onClose, onProductAdd, apiRoute, storagePath, maintitle }) {
    const [mainTitle, setMainTitle] = useState(maintitle);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState([{ size: '', quantity: '' }]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleQuantityChange = (index, key, value) => {
        const newQuantities = [...quantity];
        newQuantities[index][key] = value;
        setQuantity(newQuantities);
    };

    const handleImageChange = (files) => {
        setImages(files);
    };

    const addQuantityField = () => {
        setQuantity([...quantity, { size: '', quantity: '' }]);
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
                mainTitle,
                product: [{
                    title,
                    quantity: { size: quantity },
                    amount: Number(amount),
                    img: uploadedImageUrls
                }]
            };

            let res = await fetch(apiRoute, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            res = await res.json();
            if (res.ok) {
                toast.success('Product added!');
                onProductAdd();
                onClose();
            } else {
                toast.error(res.error);
            }
        } catch (err) {
            toast.error('Failed to add product!');
            console.log(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="absolute top-40 left-40 p-5 bg-black rounded-md text-white">
            <Toaster closeButton position="bottom-right" />
            <form onSubmit={submitHandler} className="w-full">
                <div className="flex flex-col gap-2">
                    <label htmlFor="mainTitle">Main Title:</label>
                    <input type="text" className="text-black" id="mainTitle" value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} required />

                    <label htmlFor="title">Title:</label>
                    <input type="text" className="text-black" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <label htmlFor="amount">Amount:</label>
                    <input type="number" className="text-black" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />

                    <label>Quantity:</label>
                    {quantity.map((q, index) => (
                        <div key={index} className="flex gap-2">
                            <input type="text" className="text-black" placeholder="Size" value={q.size} onChange={(e) => handleQuantityChange(index, 'size', e.target.value)} required />
                            <input type="number" className="text-black" placeholder="Quantity" value={q.quantity} onChange={(e) => handleQuantityChange(index, 'quantity', e.target.value)} required />
                        </div>
                    ))}
                    <button type="button" onClick={addQuantityField}>Add Size</button>

                    <label>Images:</label>
                    <input type="file" className="text-white" multiple onChange={(e) => handleImageChange(e.target.files)} required />

                    <button className='bg-white text-black py-1 px-3 mt-2' disabled={uploading}>
                        {uploading ? <BeatLoader loading={uploading} size={10} color='black' aria-label="Loading Spinner" data-testid="loader" /> : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductFormModal;
