import { blog_data } from "@/assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";

import axios from 'axios';
import { SegmentPrefixRSCPathnameNormalizer } from "next/dist/server/normalizers/request/segment-prefix-rsc";

interface BlogDataItem {
  _id: number;
  title: string;
  description: string;
  image: StaticImageData; // Accept both types
  date: number; // `Date.now()` returns a number (timestamp)
  category: string;
  author: string;
  author_img: string | StaticImageData; // Accept both types
}

const BlogList: React.FC = () => {
  const [menu, setMenu] = useState<string>("All");
  const [blogs , setBlogs] = useState([]);

  const fetchBlogs = async() =>{
    const response = await axios.get('/api/posts');
    setBlogs(response.data.blogs);
    
  }

  useEffect(()=>{
    fetchBlogs();
  } ,[])

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={menu === category ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item: BlogDataItem) => (menu === "All" ? true : item.category === menu))
          .map((item: BlogDataItem) => (
            <BlogItem
              key={item._id}
              image={item.image}
              title={item.title}
              category={item.category}
              description={item.description}
              id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
