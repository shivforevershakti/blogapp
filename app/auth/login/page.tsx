'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";


export default function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const response = await axios.post("/api/auth/login", formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    email: '',
                    password: ''
                })
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Submission failed.");
        } finally {
            router.push('/admin')
        }

    };


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };


    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <Image src={assets.logo} width={180} alt="" className='w-[130px]' />
                </Link>
                <Link href="/auth/register" className='font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Register</Link>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">

                <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        className="w-full px-3 py-2 mb-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        className="w-full px-3 py-2 mb-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full py-2 mt-2 text-white bg-blue-500 rounded">
                        Login
                    </button>
                </form>
                <ToastContainer theme="dark" />

            </div>
        </div>
    );
}
