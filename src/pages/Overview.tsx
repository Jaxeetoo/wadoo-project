import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarItem
} from "@/components/ui/menubar"

const Overview = () => {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Kanban</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Board</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default Overview