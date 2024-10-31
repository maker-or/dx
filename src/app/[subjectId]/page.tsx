import React from 'react'
import ServerComponent from '~/components/ui/ServerComponent'
import Greeting from "~/components/ui/Greeting";
import Navbar from "~/components/ui/Navbar";

const Page = () => {
  return (
    <div>
      <Greeting/>
      <Navbar/>
    <ServerComponent/>
    </div>
  )
}

export default Page
