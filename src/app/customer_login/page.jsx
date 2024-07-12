"use client";
import { useEffect } from "react";
import CustomerLoginForm from "@/components/CustomerLoginForm";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebase";
import { useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter();
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                router.push('/')
            }
        })
    },[auth, router])

    return (
        <div className="h-[calc(110.6vh)] flex pt-24">
        <div className='hidden md:block h-full w-1/2'>
            <img src="https://sahara-theme.myshopify.com/cdn/shop/files/bg_4a93eafd-a31f-4d25-a585-6c3aea1db6a4.jpg" alt="" />
        </div>
        <div className="h-full md:w-1/2 flex flex-col justify-center pl-10 md:pl-20 md:pr-10 items-start">
            <div className="md:w-full flex flex-col justify-center items-start border-b py-16">
            <h1 className="uppercase text-3xl font-semibold tracking-wider py-5">Welcome Back</h1>
            <CustomerLoginForm />
            </div>   
        </div>
    </div>
    )
}