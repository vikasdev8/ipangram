import React, { useContext } from "react";
import {
    Button,
    Dialog,
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
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from "@app/_RTK_Query/authentication_query";

interface Inputs {
    name?: string,
    email?: string,
    role?: string,
    department?: string,
    password?: string,
    cpassword?: string,
    _id?:string
}

export function Form({ handleOpen, open, type, datas }: { handleOpen: () => void, open: boolean, type: string, datas: any }) {
    const { alertFun } = useContext(Context)!;
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
        setValue
    } = useForm<Inputs>()
    const [signUpR] = useCreateEmployeeMutation();
    const [updateR] = useUpdateEmployeeMutation();
    const resetForm = () => {
        handleOpen();
        reset()
    }
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data,type)
        if(type === "create"){
            signUpR(data).unwrap().then((res) => {
                alertFun('Created Successfully', "success");
            }).catch((error) => {
                alertFun(error?.data?.message, "error")
            })
        }
        if(type === "update"){
            updateR(data).unwrap().then((res) => {
                alertFun('Updated Successfully', "success");
            }).catch((error) => {
                alertFun(error?.data?.message, "error")
            })
        }
        resetForm();
    }

    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={resetForm}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" className="mx-auto" color="blue-gray">
                                {type === "create" ? "Create Employee" : "Update Employee"}
                            </Typography>
                            {
                                type === "create" &&
                                <>
                                    <div>
                                        <Input label="Full Name" size="lg" type="text" {...register("name", { required: "Name Missing" })} crossOrigin="anonymous" />
                                        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                                    </div>
                                    <div>
                                        <Input label="Email" size="lg" type="email" {...register("email", { required: "Email Missing" })} crossOrigin="anonymous" />
                                        <ErrorMessage errors={errors} name="email" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                                    </div>
                                </>
                            }
                            {
                                type === "update" &&
                                <input hidden {...register('_id')} value={datas?._id}/>
                            }
                            <div>
                                <Select label="Designation" value={type === "update" ? datas?.role : ""} {...register('role', { required: "Role should be from dropdown",value:datas?.role || "" })} onChange={(e: any) => setValue("role", e)}>
                                    <Option value="employee">Employee</Option>
                                    <Option value="manager">Manager</Option>
                                </Select>
                                <ErrorMessage errors={errors} name="role" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                            </div>
                            <div>
                                <Select label="Department" value={type === "update" ? datas?.department : ""} {...register('department', { required: "Deparement should be from dropdown", value:datas?.role || "" })} onChange={(e: any) => setValue("department", e)}>
                                    {
                                        deparment.map((dep, i) => (
                                            <Option key={i} value={dep}>{dep}</Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage errors={errors} name="role" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                            </div>
                            {
                                type === "create" &&
                                <>
                                    <div>
                                        <Input label="Password" size="lg" type="password" {...register("password", { required: "Confirm Passowrd Missing", validate: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/ig.test(value!) || "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" })} crossOrigin="anonymous" />
                                        <ErrorMessage errors={errors} name="password" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                                    </div>
                                    <div>
                                        <Input label="Confirm Password" size="lg" type="text" {...register("cpassword", { required: "Confirm Passowrd Missing", validate: (value) => value === getValues('password') ? true : "Password and Confirm Password is not equal" })} crossOrigin="anonymous" />
                                        <ErrorMessage errors={errors} name="cpassword" render={({ message }) => <p className="text-[10px] text-red-400">{message}</p>} />
                                    </div>
                                </>
                            }
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" type="submit" fullWidth>
                                { type === "create" ? "Create Employee" : "Update Employee" }
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}