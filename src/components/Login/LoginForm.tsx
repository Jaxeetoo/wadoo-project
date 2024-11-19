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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1,
    {
        message: "project name must be atleast 1 character"
    }).max(60,{
      message: "Can only contain up until 60 characters"
    })
});


const LoginForm = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = () => {

  }

  return (
    <Form {...form} >
      <form onSubmit={onSubmit} className="space-y-4 pt-4">
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
              <FormLabel htmlFor="user_password">Password</FormLabel>
              <FormControl>
                <PasswordInput id="user_password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full">
          <Label>Sign In</Label>
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm