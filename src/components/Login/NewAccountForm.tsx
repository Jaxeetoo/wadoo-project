import React from 'react'

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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";


const formSchema = z.object({
  username: z.string().min(4, {
    message:"username must be at least 4 characters"
    }),
  email: z.string().email(),
  password: z.string().min(8,
    {
        message: "password must be atleast 8 characters"
    }),
  confirm_password: z.string()
}).superRefine((val, ctx) => {
  
  if (val.confirm_password !== val.password)
  {
    ctx.addIssue({
      code: "custom",
      message: "passwords did not match",
      path: ['confirm_password', 'password']
    })
  }


});

const NewAccountForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {

  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input id="username" type="text" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="user_email">Email</FormLabel>
              <FormControl>
                <Input id="user_email" type="email" {...field}/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <PasswordInput id="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput id="confirm_password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Label>Create New Account</Label>
        </Button>
      </form>
    </Form>
  )
}

export default NewAccountForm