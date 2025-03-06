import { assets } from "@/assets/assets";
import Image from "next/image";

// ✅ Define TypeScript Props
interface BlogTableItemProps {
    mongoId: string;
    authorImg?: string;
    title: string;
    author: string;
    date?: string;
    onDelete?: (id: string) => void;
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ mongoId, authorImg, title, author, date, onDelete }) => {
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="flex items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image src={authorImg || assets.profile_icon} alt="Author" width={40} height={40} className="rounded-full" />
                <p>{author || "No author"}</p>
            </th>
            <td className="px-6 py-4">
                {title || "No title"}
            </td>
            <td className="px-6 py-4">
                {date ? new Date(date).toDateString() : "Unknown Date"}
            </td>
            <td className="px-6 py-4 cursor-pointer text-red-500 font-semibold hover:opacity-70 transition-all duration-200" onClick={() => onDelete?.(mongoId)}>
                ✖
            </td>
        </tr>
    );
};

export default BlogTableItem;
