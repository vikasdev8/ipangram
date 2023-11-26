"use client"
import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { Context } from '@app/_helper/alertProvider';
import deparment from "@app/_helper/department";
import {useCreateEmployeeMutation} from '@app/_RTK_Query/authentication_query';
import {useRouter} from 'next/navigation'
import { signIn,useSession } from 'next-auth/react'

interface Inputs {
  name: string,
  email: string,
  role: string,
  department: string,
  password: string,
  cpassword: string,
}

export default function SignUpForm() {
  const {status} = useSession();
  const router = useRouter();
  const { alertFun } = useContext(Context)!;
  const [signUpR, result] = useCreateEmployeeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<Inputs>()

  const resetForm = () => {
    reset()
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data,errors)
    signUpR(data).unwrap().then((res)=>{
      alertFun('Sign Up Successfully', "success");
      router.push('/login')
    }).catch ((error)=>{
      alertFun(error?.data?.message, "error")
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
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-full max-w-[24rem]">
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
                <Select label="Designation" {...register('role',{required:"Role should be from dropdown"})}  onChange={(e: any) => setValue("role", e)}>
                  <Option value="employee">Employee</Option>
                  <Option value="manager">Manager</Option>
                </Select>
                <ErrorMessage errors={errors} name="role" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Select label="Department" {...register('department',{required:"Deparement should be from dropdown"})} onChange={(e: any) => setValue("department", e)}>
                  {
                    deparment.map((dep, i) => (
                      <Option key={i} value={dep}>{dep}</Option>
                    ))
                  }
                </Select>
                <ErrorMessage errors={errors} name="role" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Password" size="lg" type="password" {...register("password", { required: "Confirm Passowrd Missing", validate: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/ig.test(value) || "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
              <div>
                <Input label="Confirm Password" size="lg" type="text" {...register("cpassword", { required: "Confirm Passowrd Missing", validate: (value) => value === getValues('password') ? true : "Password and Confirm Password is not equal" })} crossOrigin="anonymous" />
                <ErrorMessage errors={errors} name="cpassword" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth disabled={result?.isLoading}>
                { result?.isLoading === true ? "...Loading" : "Sign UP" }
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                already have an account?
                <Typography
                  as="button"
                  type="button"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={()=>router.push('/login')}
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