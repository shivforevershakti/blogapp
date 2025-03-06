'use client';

import { assets, blog_data } from "@/assets/assets";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import axios from 'axios';

interface BlogPageProps {
    params: Promise<{
        id: string; // `params.id` comes as a string from URL
    }>;
}

interface BlogDataItem {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    date: number;
    category: string;
    author: string;
    authorImg: StaticImageData;
}

const BlogPage: React.FC<BlogPageProps> = ({ params }) => {
    const { id } = use<{id:string}>(params);

    const [data, setData] = useState<BlogDataItem | null>(null);

    const fetchBlogData = async() =>{
       const response = await axios.get('/api/posts' , {
        params:{
            id: id
        }
       });
       setData(response.data);
    }

    useEffect(() => {
       fetchBlogData()
    }, [id]);
    return (data ? <>
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                <Image src={assets.logo} width={180} alt="" className='w-[130px]' />
                </Link>
                <button className='font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Login</button>
            </div>
        </div>
        <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
            <div className="text-center my-24">
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
                <Image src={data.authorImg} alt="" width={60} height={60} className="mx-auto mt-6 border border-white rounded-full" />
                <p className={'mt-1 pb-2 text-lg max-w-[740px] mx-auto'}>{data.author}</p>
            </div>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
            <Image src={data.image} alt="" width={1280} height={720} className="border-4 border-white" />
            <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
            <p className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }}></p>
            <div className="my-24">
                <p className='text-black font font-semibold my-4'>Share this article:</p>
                <div className="flex">
                    <Image src={assets.facebook_icon} alt='' width={50} />
                    <Image src={assets.twitter_icon} alt='' width={50} />
                    <Image src={assets.googleplus_icon} alt='' width={50} />

                </div>
            </div>
        </div>

    </> : <></>
    );
};

export default BlogPage;
