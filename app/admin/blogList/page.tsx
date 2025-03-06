'use client'

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


// ✅ Define TypeScript Interface for Blog Data
interface Blog {
    _id: string;
    title: string;
    author: string;
    authorImg: string;
    date: string;
}

const Page = () => {
    const [dataSource, setDataSource] = useState<Blog[]>([]); // ✅ Added TypeScript Type

    // ✅ Fetch Blogs from API
    const fetchingBlogs = async () => {
        try {
            const response = await axios.get('/api/posts');
            setDataSource(response.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const onDelete = async (mongoId: string) => {
        const response = await axios.delete(`/api/posts`, {
            params: {
                id: mongoId
            }
        });
        toast.success(response.data.msg);
        fetchingBlogs();
    }

    useEffect(() => {
        fetchingBlogs();
    }, []);

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1 className="text-lg font-semibold">All Blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="hidden sm:block px-6 py-3">Author Name</th>
                            <th scope="col" className="px-6 py-3">Blog Title</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-2 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length > 0 ? (
                            dataSource.map((item) => (
                                <BlogTableItem
                                    key={item._id}
                                    mongoId={item._id}
                                    authorImg={item.authorImg}
                                    title={item.title}
                                    author={item.author}
                                    date={item.date}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    No blogs available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
