import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form";

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

interface NewProjProps {
  project_creator: string;
  CancelButton: React.ComponentType;
  SetState: (state: boolean) => void;
}

const formSchema = z.object({
  project_name: z.string().min(1,
    {
        message: "project name must be atleast 1 character"
    }).max(60,{
      message: "Can only contain up until 60 characters"
    }),
  project_creator: z.string()
  
});

const NewProjectForm = (props: NewProjProps) => {
  const { project_creator, CancelButton, SetState } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
      project_creator:""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.project_creator = project_creator;
    console.log(values)
    SetState(false);
    //TODO close dialog

    
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