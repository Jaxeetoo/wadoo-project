import React from 'react'

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import { Label } from '@/components/ui/label';

const MainNavbar = () => {
  return (
    <div className='flex lg:justify-center items-center w-full bg-zinc-900'>
      <div className="flex justify-between items-center self-center  w-full 2xl:w-[95rem] h-[3rem] px-[1rem]">
        <div className='flex items-center'>
          <img src='src\assets\Wadoo-logo.svg' />
          <Label className='text-white'>Wadoo</Label>
        </div>

        <div>
          <Avatar className='justify-end'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default MainNavbar