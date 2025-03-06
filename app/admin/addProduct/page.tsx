'use client';

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Page: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Shiv Shakti",
        authorImg: "/author_img.png",
    });

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!image) {
            toast.error("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("authorImg", data.authorImg);
        formData.append("image", image);

        try {
            const response = await axios.post("/api/posts", formData);
            if (response.data.success) {
                toast.success(response.data.msg);
               setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Shiv Shakti",
                authorImg: "./author_img.png",
            })
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Submission failed.");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
                <p className="text-xl">Upload thumbnail</p>
                <label htmlFor="image">
                    <Image 
                        className="mt-4"
                        src={image ? URL.createObjectURL(image) : assets.upload_area} 
                        width={140} 
                        height={70} 
                        alt="Thumbnail preview"
                    />
                </label>
                <input 
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} 
                    type="file" 
                    id="image" 
                    hidden 
                    required 
                />

                <p className="text-xl mt-4">Blog title</p>
                <input
                    name="title"
                    onChange={onChangeHandler}
                    value={data.title}
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                    type="text"
                    placeholder="Type here"
                    required
                />

                <p className="text-xl mt-4">Description</p>
                <textarea
                    name="description"
                    onChange={onChangeHandler}
                    value={data.description}
                    className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                    placeholder="Write content here"
                    rows={6}
                    required
                />

                <p className="text-xl mt-4">Blog category</p>
                <select 
                    name="category" 
                    onChange={onChangeHandler} 
                    value={data.category} 
                    className="w-40 mt-4 px-4 py-3 border text-gray-500"
                >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>

                <br />
                <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
                    ADD
                </button>
            </form>
            <ToastContainer theme="dark"/>
        </div>
    );
};

export default Page;import { useRouter } from "next/navigation";

