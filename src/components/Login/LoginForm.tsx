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

import { SignIn } from "@/backend/auth/sign-in";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});


const LoginForm = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    SignIn(values.email, values.password).then( data => console.log('test'))
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel htmlFor="user_email">Email</FormLabel>
              <FormControl>
                <Input id="user_email" type="email" {...field}/>
              </FormControl>
              {errors.email && <FormMessage>Invalid Email</FormMessage>}
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
              {errors.password && <FormMessage>incorrect password</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Label>Sign In</Label>
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm