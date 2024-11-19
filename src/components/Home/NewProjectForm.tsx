import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form";

import * as dayjs  from "dayjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { ProjectDetails } from "./types/ProjectType";

import {
  newProjectID
} from "@/lib/utils";

interface NewProjProps {
  project_creator: string;
  CancelButton: React.ComponentType;
  SetState: (state: boolean) => void;
  AddProject: (newProject: ProjectDetails) => void;
}

const formSchema = z.object({
  project_name: z.string().min(1,
    {
        message: "project name must be atleast 1 character"
    }).max(60,{
      message: "Can only contain up until 60 characters"
    })
  
});

const NewProjectForm = (props: NewProjProps) => {
  const { project_creator, CancelButton, SetState, AddProject } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    AddProject({
      creator_id: "",
      project_creator: project_creator,
      project_id: newProjectID(),
      project_name: values.project_name,
      date_created: new Date()
    });

    SetState(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="justify-center p-5">
        <FormField 
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem className="py-5">
              <FormLabel>Project Name</FormLabel>
              <FormControl className="max-w-60">
                <Input placeholder="test" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <CancelButton />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default NewProjectForm