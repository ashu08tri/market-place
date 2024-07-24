"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { decode } from 'jsonwebtoken';
import app from "@/firebase";
import { getStorage, ref, deleteObject } from 'firebase/storage';
import ProductFormModal from "./ProductFormModal";
import { useRouter } from "next/navigation";

function Button({ category, id, title, sizes, amount, img }) {
    const { data: session } = useSession();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null);
    const router = useRouter();

    const closeProductFormModal = () => {
        setIsFormOpen(!isFormOpen);
    };

    const refreshData = async (category, id) => {
        try {
            let res = await fetch(`/api/collections/${category}/${id}`);
            res = await res.json();
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    const handleProductUpdate = async () => {
        await refreshData(category, id)
    }

    const deleteHandler = async (category, id, img) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, img[0]);
        try {
            await deleteObject(storageRef);
            let res = await fetch(`/api/collections/${category}/${id}`, {
                method: 'DELETE',
                cache: 'no-store'
            });
            res = await res.json();
            if (res.ok) {
                alert('Item deleted!')
                router.back();
            } else {
                alert('Failed to delete item!')
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (session) {
            setToken(session.user.accessToken);
        }
    }, [session]);

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

    return (
        <>
            {isAdmin && <div>
                <button className="px-3 py-1 text-white bg-black mr-3" onClick={() => setIsFormOpen(!isFormOpen)}>Edit</button>
                <button className="px-3 py-1 text-white bg-black" onClick={() => deleteHandler(category, id, img)}>Delete</button>
            </div>}

            {isFormOpen && <ProductFormModal onClose={closeProductFormModal} onProductAdd={handleProductUpdate} apiRoute={`/api/collections/${category}/${id}`}
                storagePath={`productImages/${category}`} method={'PUT'} maintitle={category}
                titles={title} amounts={amount} sizes={sizes} img={img}
            />}
        </>
    )
}

export default Button