import React from 'react'
import Link from 'next/link';
  // import Greeting from "~/components/ui/Fold";
  // import Navbar from "~/components/ui/Fold";
// import Navyear from '~/components/ui/Navyear'

const page = () => {
  return (
    <div>
                 {/* <Greeting/>
                 <Navbar/>  */}
    <h1 className='text-3xl mt-4 mb-4'>Subject</h1>
    <div className="flex flex-wrap gap-6 w-full">
       
       <div className="flex flex-row items-center justify-center gap-6">
         <Link  target='_blank' className='flex flex-col items-center justify-center' href={''}>
           <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3]'>

             <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-nowrap'>
               FLAT
             </div>
           </div>
         </Link>

         <Link  target='_blank' className='flex flex-col items-center justify-center' href={''}>
           <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3]'>

             <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-nowrap'>
               FED
             </div>
           </div>
         </Link>

         <Link  target='_blank' className='flex flex-col items-center justify-center' href={''}>
           <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3]'>

             <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-nowrap'>
               AI
             </div>
           </div>
         </Link>

         <Link  target='_blank' className='flex flex-col items-center justify-center' href={''}>
           <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3]'>

             <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-nowrap'>
               DWM
             </div>
           </div>
         </Link>

         <Link  target='_blank' className='flex flex-col items-center justify-center' href={''}>
           <div className='relative w-[250px] h-[220px]  rounded-xl bg-gradient-to-l from-[#0c0c0c] via-[#434080] to-[#0c0c0c] border-2 border-[#f7eee3]'>

             <div className='absolute bottom-0 right-0 w-full  bg-[#f7eee3] text-[#0c0c0c] text-lg font-medium px-3 py-1 rounded-b-xl text-nowrap'>
               CN
             </div>
           </div>
         </Link>
       </div>
     
   </div>
 </div>

  
  )
}

export default page
