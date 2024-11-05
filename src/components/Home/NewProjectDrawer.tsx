import React from 'react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose
} from "@/components/ui/drawer";

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


const NewProjectDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger className="flex justify-between">
        <PlusIcon />
        <Label>New Project</Label>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="font-bold text-2xl justify-center text-center">
          Add New Project
        </DrawerHeader>
        <NewProjectForm />
        <DrawerClose>
          <Button>Cancel</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>

  )
}

export default NewProjectDrawer