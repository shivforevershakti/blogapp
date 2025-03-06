
import React, { FC } from 'react';

import Image from 'next/image';
import {assets} from '@/assets/assets';
import Link from 'next/link';

const Header: FC = () => {

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
       <div className='flex justify-between items-center'>
         <Image src={assets.logo} width={180} alt=""  className='w-[130px]'/>
         <Link href="/auth/login" className='font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]' >Login</Link>
       </div>
       <div className='text-center my-8'>
          <h1 className='text-3x1 sm:text-5x1 font-medium'>Latest Blogs</h1>
        
       </div>
    </div>
    
  );
};
export default Header;


