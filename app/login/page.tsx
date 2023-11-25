"use client"
import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { signIn,useSession } from 'next-auth/react'
import { Context } from '@app/_helper/alertProvider';
import {useRouter} from 'next/navigation';

type Inputs = {
  email: string
  password: string
  keepMeLogin: number
}

export default function LogInForm() {
  const {status} = useSession();
  const router = useRouter();
  const { alertFun } = useContext(Context)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>()

  const resetForm = () => {
    reset()
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', { redirect: false, ...data }).then((res) => {
      if (!res?.ok) {
        return alertFun(res?.error!, "error");
      }
      alertFun('Sign in Successfully', "success");
      router.push('/dashboard')
    })
    resetForm();
  }

  useEffect(()=>{
    if(status === "authenticated"){
        router.push('/dashboard')
    }
  },[status])

  return (
    <>
      <div className="w-full h-screen justify-center flex items-center">
        <Card className="w-full max-w-[24rem]">
          <form onSubmit={handleSubmit(onSubmit)} >
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" className="mx-auto" color="blue-gray">
                Log In
              </Typography>
              <div>
                <Input label="Email Or Mobile" size="lg" type="text" {...register("email", { required: "Email Missing" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Password" size="lg" type="password" {...register("password", { required: "Password Missing", })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="keepMeLogin" crossOrigin="anonymous" {...register("keepMeLogin")} defaultValue={0} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Log In
              </Button>

              <Typography variant="small" className="mt-4 flex justify-center">
                Don't have an account?
                <Typography
                  as="button"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  type="button"
                  onClick={()=>router.push('/signup')}
                >
                  Sign UP
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}