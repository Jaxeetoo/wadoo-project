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
    <div className="">
      <Tabs defaultValue="Kanban" className="relative m-4 px-4 md:px-24 lg:px-56 justify-center max-w-fit">
        <TabsList className="ml-4 rounded-[.5rem] mt-10">
          <TabsTrigger value="Kanban" className="rounded-[.3rem]">Kanban</TabsTrigger>
          <TabsTrigger value="Board" className="rounded-[.3rem]">Board</TabsTrigger>
        </TabsList>
        <TabsContent value="Kanban">
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