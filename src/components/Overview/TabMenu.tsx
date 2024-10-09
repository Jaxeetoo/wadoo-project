import { useState, useEffect } from "react"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";

interface TabMenuProps {
  onTabSelected: (data: string) => void
}

const TabMenu = ({onTabSelected}: TabMenuProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("Kanban")

  useEffect(() => {
      onTabSelected(selectedTab);
    }
  ,[selectedTab])

  return (
    <div className="flex justify-center p-4 ml-[-50em] mt-20">
      <Menubar className="max-w-fit self-center">
        <MenubarMenu>
          <MenubarTrigger onClick={() => setSelectedTab("Kanban")}>Kanban</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => setSelectedTab("Board")}>Board</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default TabMenu