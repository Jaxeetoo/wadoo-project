
import { 
  Label
} from "@/components/ui/label";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";

import NewProjectDrawer from "@/components/Home/NewProjectDrawer";

const Home = () => {
  return (
    <div className='relative p-10 mt-16 flex justify-center items-center'>
      <div className="flex items-center min-w-[50%] max-w-[50%] justify-between ">
        <Label className="text-xl">Your Projects</Label>
        <Menubar className="w-content">
          <MenubarMenu>
            <MenubarTrigger>
              <NewProjectDrawer />
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}

export default Home