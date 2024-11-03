import "~/styles/globals.css";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
// import Greeting from "../components/ui/Greeting";
import { FolderProvider } from "../components/ui/FolderContext";
// import Navbar from "../components/ui/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Cmd from "~/components/ui/Cmd";
import { Instrument_Serif,  } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
const Inst = Instrument_Serif({
  weight: "400", // Added weight property
  subsets: ['latin'],
  display: 'swap',
  style: 'italic'

})
import { CSPostHogProvider } from '~/app/_analytics/providers'



export const metadata: Metadata = {
  title: "Sphere",
  description: "AI-powered knowledge management platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <ClerkProvider>
      <CSPostHogProvider>
      <Analytics/>
          <html lang="en" className={`${GeistSans.variable} ${Inst.className}`}>
      
        <body>
        <SignedOut>
          <div className="h-screen w-screen flex items-center justify-center flex-col bg-[#0c0c0c]">
           
          <SignIn routing="hash" />
          </div>
                
        </SignedOut>

        <SignedIn>
          <div className="p-6 m-1">
           {/* <Greeting/>
          <Navbar/>  */}
          <Cmd/>
          <FolderProvider>  
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
          {children}
           </FolderProvider> 
          </div>


          
              
          </SignedIn>
        
        </body>
    </html>
    </CSPostHogProvider>
    </ClerkProvider>

  );
}