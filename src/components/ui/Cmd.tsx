'use client';
import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../components/ui/command"
import { PiArrowElbowDownRight  } from "react-icons/pi";
import {SignOutButton} from '@clerk/nextjs'

const Cmd = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)  // Toggles the dialog on Cmd + K
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div>
      {/* Dialog that opens/closes based on state */}
      <Command >
      <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput placeholder="Search anything" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" >

            <CommandItem className='text-black font-medium flex gap-2 align-middle'>
              <PiArrowElbowDownRight  />
              Summarise
            </CommandItem>

            <CommandItem className='text-black font-medium flex gap-2 align-middle'>
            <PiArrowElbowDownRight  />
              Change to
            </CommandItem>

            <CommandItem className='text-black font-medium flex gap-2 align-middle'>
            <PiArrowElbowDownRight  />
              Ask
            </CommandItem>

            <CommandItem className='text-black font-medium flex gap-2 align-middle'>
            <PiArrowElbowDownRight  />
            <SignOutButton/>
            </CommandItem>

          </CommandGroup>
          <CommandSeparator />

        </CommandList>
      </CommandDialog>
      </Command>
    </div>
  )
}

export default Cmd;
