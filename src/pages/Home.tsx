import { useState } from "react";

import { 
  Label
} from "@/components/ui/label";

import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
 } from "@/components/ui/select";

import NewProjectDialog from "@/components/Home/NewProjectDialog";

import { ProjectDetails } from "@/components/Home/types/ProjectType";
import ProjectCard from "@/components/Home/ProjectCard";
import MainNavbar from "@/components/MainNavbar";
import { Input } from "@/components/ui/input";



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

  const addProject = (newProject: ProjectDetails) => {
    setProjectCards([...projectCards, newProject]);
  }

  return (
    <div className='relative flex flex-col justify-center items-center'>
      <MainNavbar />
      <div className="w-[55%]">
        <div className="flex items-center w-full justify-between mt-16 ">
          <Label className="text-xl">Your Projects</Label>
          <div className="flex justify-end gap-2">
            <Input placeholder="Search" className="w-[40%]" />
            <Select>
              <SelectTrigger className="w-[10rem]">
                <SelectValue placeholder="sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascending">ascending</SelectItem>
                <SelectItem value="descending">descending</SelectItem>
                <SelectItem value="date_created">date created</SelectItem>
              </SelectContent>
            </Select>
            <NewProjectDialog />

          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1rem] w-full pt-4">
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
      
    </div>
  )
}

export default Home