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
    <Menubar className="max-w-64 justify-center">
      <MenubarMenu>
        <MenubarTrigger onClick={() => setSelectedTab("Kanban")}>Kanban</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => setSelectedTab("Board")}>Board</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}

export default TabMenu