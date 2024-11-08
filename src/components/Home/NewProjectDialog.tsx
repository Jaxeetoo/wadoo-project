import {useState, createContext, useContext, ReactNode} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog"



import {
  Label
} from "@/components/ui/label";

import {
  Button
} from "@/components/ui/button";

import {
  PlusIcon
} from "@radix-ui/react-icons";

import NewProjectForm from './NewProjectForm';
import { ProjectDetails } from './types/ProjectType';

interface newProjectDialogProps {
  addProject: (newProject: ProjectDetails) => void;
}

const NewProjectDialog = (props: newProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { addProject } = props;

  

  const cancelButtonContent = () => <DialogClose onClick={() => setIsOpen(false)}>Cancel</DialogClose>
  

  const changeOpenState = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger className="flex justify-between bg-zinc-200 shadow-md p-2 rounded-[.1rem] cursor-pointer hover:bg-gray-100" 
        onClick={() => setIsOpen(true)}>
        <PlusIcon />
        <Label className='text-nowrap'>New Project</Label>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='opacity-70'>
          <DialogContent>
            <DialogHeader className="font-bold text-2xl justify-center text-center">
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <DialogDescription>Enter a name for your new project</DialogDescription>
            <NewProjectForm 
              project_creator="me"
              CancelButton={cancelButtonContent}
              SetState = {changeOpenState}
              AddProject= {addProject}
            />
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  )
}

export default NewProjectDialog
