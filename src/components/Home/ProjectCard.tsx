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
  return (
    <Card className='min-w-[8rem] max-w-[16rem] h-[5rem] p-4 text-wrap' onClick={() => {console.log(project_details.project_id)}}>
      <CardTitle>
        {project_details.project_name}
      </CardTitle>
    </Card>
  )
}

export default ProjectCard