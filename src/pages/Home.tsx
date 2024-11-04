
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem
} from "@/components/ui/menubar";



const Home = () => {
  return (
    <div className='relative flex flex-col items-center justify-center p-10 bg-slate-50'>
      <Label className="">Your Workspace</Label>
      <Menubar className="w-1/2">
        <MenubarMenu>
          <MenubarTrigger>New Project</MenubarTrigger>
          
        </MenubarMenu>
        <MenubarMenu>
        <MenubarTrigger>Test</MenubarTrigger>
        </MenubarMenu>
      </Menubar>

    </div>
  )
}

export default Home