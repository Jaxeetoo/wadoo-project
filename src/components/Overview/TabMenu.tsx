import { useState, useEffect } from "react"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

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
    <div className="flex justify-start ml-4 p-4 mt-20">
      <Tabs defaultValue="Kanban" className="max-w-fit self-center">
        <TabsList>
          <TabsTrigger value="Kanban">Kanban</TabsTrigger>
          <TabsTrigger value="Board">Board</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabMenu