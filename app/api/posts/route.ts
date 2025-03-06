import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/model/BlogModel";
import { blog_data } from "@/assets/assets";
const fs = require('fs')

// Ensure the database is connected
const LoadDb = async () => {
    await ConnectDB();
};
LoadDb();

// Define TypeScript types for FormData values
interface BlogFormData {
    title: string;
    description: string;
    category: string;
    author: string;
    image: string;
    authorImg: string;
}

// GET request handler
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});

        return NextResponse.json({ blogs });
    }



}

// POST request handler with TypeScript
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const timeStamp = Date.now();

        // Extract image file from FormData
        const image = formData.get("image") as File | null;
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Convert image to buffer
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        // Define file path
        const path = `./public/${timeStamp}_${image.name}`;
        await writeFile(path, buffer);
        const imgUrl = `/${timeStamp}_${image.name}`;

        // Validate and extract blog data
        const blogData: BlogFormData = {
            title: formData.get("title")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            category: formData.get("category")?.toString() || "",
            author: formData.get("author")?.toString() || "",
            image: imgUrl,
            authorImg: formData.get("authorImg")?.toString() || "",
        };

        console.log(blogData, 'asd')

        // Validate required fields
        if (!blogData.title || !blogData.description || !blogData.category || !blogData.author) {
            return NextResponse.json({ error: "Missing required blog fields" }, { status: 400 });
        }

        // Save blog data to the database
        await BlogModel.create(blogData);
        console.log("Blog saved successfully");

        return NextResponse.json({ success: true, msg: "Blog Added" });

    } catch (error) {
        console.error("Error processing blog post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");
    const blog = await BlogModel.findById(blogId);
    fs.unlink(`./public${blog.image}`, () => { });
    await BlogModel.findByIdAndDelete(blogId);
    return NextResponse.json({ msg: 'Blog Deleted' });


}