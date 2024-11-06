import { useState } from "react";

import { 
  Label
} from "@/components/ui/label";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";

import NewProjectDialog from "@/components/Home/NewProjectDialog";

import { ProjectDetails } from "@/components/Home/types/ProjectType";
import ProjectCard from "@/components/Home/ProjectCard";

const TEST_DEFAULT = [
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem",
    project_name:"1st"
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem2",
    project_name:"john Doe"
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem3",
    project_name:"project overview"
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem4",
    project_name:"long title"
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem5",
    project_name:"fifth Lorem Ipsum what is this test fifty thigns to edo lore"
  },
]

const Home = () => {
  const [projectCards, setProjectCards] = useState<ProjectDetails[]>(TEST_DEFAULT);

  return (
    <div className='relative p-10 mt-16 flex flex-col justify-center items-center'>
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
      <div className="grid grid-cols-3 gap-[1rem] pt-4">
        {
          projectCards?.map((projectDetails, index) => (
            <ProjectCard 
              key={index}
              project_details={projectDetails}
            />

          ))
        }
      </div>
    </div>
  )
}

export default Home