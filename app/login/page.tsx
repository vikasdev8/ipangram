"use client"
import React, { useContext } from "react";
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
import { signIn } from 'next-auth/react'
import { Context } from '@app/_helper/alertProvider';

type Inputs = {
  email: string
  password: string
  keepMeLogin: number
}

export default function LogInForm() {
  const { alertFun } = useContext(Context)!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>()

  const resetForm = () => {
    // handleOpen();
    reset()
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', { redirect: false, data }).then((res) => {
      if (!res?.ok) {
        return alertFun(res?.error!, "error");
      }
      alertFun('Sign in Successfully', "success");
    })
    resetForm();
  }

  const signupPage = () => {
    resetForm();
    // signupFun();
  }
  return (
    <>
      <div className="w-full h-screen justify-center items-center">
        <Card className="mx-auto w-full max-w-[24rem]">
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
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                // onClick={signupPage}
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