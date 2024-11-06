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

const NewProjectDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const cancelButtonContent = () => <DialogClose onClick={() => setIsOpen(false)}>Cancel</DialogClose>;

  const changeOpenState = (state: boolean) => {
    setIsOpen(state);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger className="flex justify-between" onClick={() => setIsOpen(true)}>
        <PlusIcon />
        <Label>New Project</Label>
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
            />
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  )
}

export default NewProjectDialog
