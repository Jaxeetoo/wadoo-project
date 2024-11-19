import { useState } from 'react'
import { 
  Card,
  CardHeader,
  CardContent

} from "@/components/ui/card";


import {
  Button,
} from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import LoginForm from '@/components/Login/LoginForm';
import NewAccountForm from '@/components/Login/NewAccountForm';

const Login = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);


  return (
    <div className='bg-slate-50 flex justify-center items-center h-screen'>
      <Card className='h-auto min-w-[15rem] p-4 rounded-[5px]'>
        <CardHeader className='text-2xl '>Login</CardHeader>
        <CardContent className=''>
          {
            isCreatingAccount ? 
            <NewAccountForm />
            :
            <LoginForm />
          }
          <Label className="flex w-full text-center justify-center py-4 opacity-60">OR</Label>
          <Button onClick={() => setIsCreatingAccount(!isCreatingAccount)}className='w-full'>
            {isCreatingAccount ? "Go Back" : "Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login