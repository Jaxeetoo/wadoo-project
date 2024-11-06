
import { 
  Label
} from "@/components/ui/label";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";

import NewProjectDialog from "@/components/Home/NewProjectDialog";

const Home = () => {
  return (
    <div className='relative p-10 mt-16 flex justify-center items-center'>
      <div className="flex items-center min-w-[50%] max-w-[50%] justify-between ">
        <Label className="text-xl">Your Projects</Label>
        <Menubar className="w-content">
          <MenubarMenu>
            <MenubarTrigger>
              <NewProjectDialog />
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              Sort by
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default Home