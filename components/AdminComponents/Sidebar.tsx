import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();

    const logout = async() =>{
  try{
     const response = await axios.get('/api/auth/logout');
     if(response.data.success){
   router.push('/');
     }
  }catch(err){
    console.log(err , 'error');
  }
    }

    return (
        <div className='flex flex-col bg-slate-100'>
            <div className="px-2 sm:pl-14 py-3 border border-black">
                <Image src={assets.logo} alt="" width={120} />

            </div>
            <div className="w-28 sm:w-80 h-[100vh] relative py-12 border border-black">
                <div className="w-[50%] sm:w-[80%] absolute right-0">
                    <Link href="/admin/addProduct" className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.add_icon} alt="" width={28} /><p>Add Blogs</p>
                    </Link>
                    <Link href="/admin/blogList" className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]">
                        <Image src={assets.blog_icon} alt="" width={28} /><p>Blog List</p>
                    </Link>
                    <button onClick={logout} className="w-full mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] cursor-pointer">Log Out</button>
                </div>


            </div>
        </div>
    )
}

export default Sidebar;