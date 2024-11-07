import React from 'react'

import {
  Card,
  CardTitle
} from "@/components/ui/card";
import { ProjectDetails } from '@/components/Home/types/ProjectType';

interface ProjectCardProps {
  project_details: ProjectDetails;

}

const ProjectCard = (props: ProjectCardProps) => {
  const { project_details } = props;

  const navigateToProject = () => {
    //TODO add functionality wherein it transferes to the project 
  }

  return (
    <Card className='md:max-w-[10rem] lg:max-w-[25rem] h-[5rem] p-4 rounded-[.3rem] cursor-pointer hover:bg-gray-100' 
    onClick={() => {console.log(project_details.project_id)}}>
      <CardTitle>
        {project_details.project_name}
      </CardTitle>
    </Card>
  )
}

export default ProjectCard