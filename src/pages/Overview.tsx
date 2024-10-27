// import TabMenu from "@/components/Overview/TabMenu";
import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import Kanban from "@/components/Overview/Kanban";
import WhiteBoard from "@/components/Overview/WhiteBoard";

const Overview = () => {
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

export default Overview