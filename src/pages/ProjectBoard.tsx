// import TabMenu from "@/components/ProjectBoard/TabMenu";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import Kanban from "@/components/ProjectBoard/Kanban";
import WhiteBoard from "@/components/ProjectBoard/WhiteBoard";

const ProjectBoard = () => {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="Kanban" className="relative">
        <TabsList className="rounded-[.5rem] mt-10">
          <TabsTrigger value="Kanban" className="rounded-[.3rem]">Kanban</TabsTrigger>
          <TabsTrigger value="Board" className="rounded-[.3rem]">Board</TabsTrigger>
        </TabsList>
        <TabsContent value="Kanban" className="">
          <Kanban />
        </TabsContent>
        <TabsContent value="Board">
          <WhiteBoard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectBoard