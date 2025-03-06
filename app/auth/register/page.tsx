'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";


export default function Register() {
    const [data, setData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const response = await axios.post("/api/auth/register", formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setData({
                    name: '',
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
            setLoading(false);
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
                <Link href="/auth/login" className='font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Login</Link>
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">

                <form onSubmit={handleRegister} className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-4 text-xl font-bold">Register</h2>
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Full Name"
                        value={data.name}
                        name="name"
                        className="w-full px-3 py-2 mb-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
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
                    <button type="submit" className="w-full py-2 mt-2 text-white bg-blue-500 rounded" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <ToastContainer theme="dark" />

            </div>
        </div>
    );
}
