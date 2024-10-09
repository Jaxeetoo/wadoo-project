import TabMenu from "@/components/Overview/TabMenu";
import { useState } from "react";

import Kanban from "@/components/Overview/Kanban";
import WhiteBoard from "@/components/Overview/WhiteBoard";

const Overview = () => {
  const [tabSelected, setTabSelected] = useState<string>("");
  
  const tabSelectedCallback = (data: string) => {
    setTabSelected(data);
  }

  return (
    <div>
      <TabMenu 
        onTabSelected={tabSelectedCallback}
      />
      {
        tabSelected === "Kanban" ?
          <Kanban /> : <WhiteBoard />
      }
    </div>
  )
}

export default Overview