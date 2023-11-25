"use client"
import React, { useContext } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,

} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import {Context} from '@app/_helper/alertProvider';
import { useRegisterMutation } from "@app/_querys/auth"

type Inputs = {
  name: string
  email: string
  mobile: number
  password: string
  cpassword: string
}

export function SignUpForm({ handleOpen,logInFun, open }: { handleOpen: () => void, logInFun:() => void, open: boolean }) {
  const {alertFun} = useContext(Context)!;
  const [signUpR, result] = useRegisterMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm<Inputs>()
  
  const resetForm = () => {
    handleOpen();
    reset()
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signUpR(data).unwrap().then((res)=>{
      alertFun('Sign Up Successfully', "success");
    }).catch ((error)=>{
      console.log(error)
      alertFun(error?.data?.message, "error")
    })
    resetForm();
  }

  const loginPage = () =>{
    resetForm();
    // logInFun();
  }
  return (
    <>
      <div className="w-full h-screen justify-center align-middle">
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={handleSubmit(onSubmit)} >
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" className="mx-auto" color="blue-gray">
                SIGN UP
              </Typography>
              <div>
                <Input label="Full Name" size="lg" type="text" {...register("name", { required: "Name Missing" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Email" size="lg" type="email" {...register("email", { required: "Email Missing" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Mobile" size="lg" type="number" {...register("mobile", { required: "Mobile number Missing", validate:(value)=>String(value).length === 10 || "Mobile number should be 10 digits" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="mobile" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Password" size="lg" type="password" {...register("password", { required: "Password Missing", })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Confirm Password" size="lg" type="text" {...register("cpassword", { required: "Confirm Passowrd Missing", validate: (value) => value === getValues('password') ? true : "Password and Confirm Password is not equal" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="cpassword" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Sign UP
              </Button>
              <Typography variant="small" className="flex justify-center mt-4">
                <Button variant="outlined" type="button" color="blue-gray" className="flex text-[10px] items-center gap-1" onClick={signWithGoogle}>
                  <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-4 w-4" />
                  Sign In With Google
                </Button>
              </Typography>
              <Typography variant="small" className="mt-4 flex justify-center">
                already have an account?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={loginPage}
                >
                  Log In
                </Typography>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}