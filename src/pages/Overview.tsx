import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar"

const Overview = () => {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Kanban</MenubarTrigger>
          <MenubarTrigger>Drawingboard</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default Overview