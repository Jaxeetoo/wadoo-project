import { useState } from "react";

import { 
  Label
} from "@/components/ui/label";

import dayjs from "dayjs";

import NewProjectDialog from "@/components/Home/NewProjectDialog";

import { ProjectDetails } from "@/components/Home/types/ProjectType";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/Home/ProjectCard";
import MainNavbar from "@/components/MainNavbar";
import SortButton from "@/components/Home/SortButton";
import SearchItem from "@/components/Home/SearchItem";



const TEST_DEFAULT = [
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem",
    project_name:"1st",
    date_created: new Date()
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem2",
    project_name:"john Doe",
    date_created: new Date()
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem3",
    project_name:"project overview",
    date_created: new Date()
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem4",
    project_name:"long title",
    date_created: new Date()
  },
  {
    creator_id:"test",
    project_creator:"me",
    project_id:"lorem5",
    project_name:"fifth Lorem Ipsum what is this test fifty thigns to edo lore",
    date_created: new Date()
  },
]

const Home = () => {
  const [projectCards, setProjectCards] = useState<ProjectDetails[]>([]);
  const [filteredItems, setFilteredItems] = useState<ProjectDetails[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const addProject = (newProject: ProjectDetails) => {
    setProjectCards([...projectCards, newProject]);
    setFilteredItems([...projectCards, newProject]);
  }

  const sortProjects = (value: string) => {
    console.log("sorting");
    switch(value)
    {
      case "ascending":
        const ascendingItems = [...projectCards].sort((x ,y) => x.project_name.toLowerCase().localeCompare(y.project_name.toLowerCase()))
        setProjectCards(ascendingItems)
      break;
      case "descending":
        const descendingItems = [...projectCards].sort((x ,y) => y.project_name.toLowerCase().localeCompare(x.project_name.toLowerCase()))
        setProjectCards(descendingItems)
      break;
      case "date_created":
        const dateCreatedSort = [...projectCards].sort((x ,y) => dayjs(x.date_created).diff(dayjs(y.date_created)))
        setProjectCards(dateCreatedSort)
      break;
      default:
        const defaultSort = [...projectCards].sort((x ,y) => x.project_name.toLowerCase().localeCompare(y.project_name.toLowerCase()))
        setProjectCards(defaultSort)
    }
  }

  const searchItems = (query: string) => {
    if (query === "" || query === " ")
    {
      setFilteredItems(projectCards);
    } else 
    {
      setFilteredItems(projectCards.filter((item) => item.project_name.toLowerCase().includes(query.toLowerCase())))
    }
  }

  return (
    <div className='relative flex flex-col justify-center items-center'>
      <MainNavbar />
      <div className="w-[55%]">
        <div className="flex items-center w-full justify-between mt-16 ">
          <Label className="text-xl">Your Projects</Label>
          <div className="flex justify-end gap-2">
            
            <SearchItem filterItemsFunc={searchItems}/>
            <SortButton callbackFunc={sortProjects}/>
            <NewProjectDialog addProject={addProject}/>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1rem] w-full pt-4">
          {
            filteredItems?.map((projectDetails, index) => (
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