import React, { useContext, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Form } from "./Form";

const Profile = ({user, update}:any) => {
  const [uopen, setUOpen] = useState(false);
  const uhandleOpen = () =>{
    setUOpen((v)=>!v)
  }
  return (
    <div className="mx-6 mt-2 ">
        <Button color="blue" onClick={uhandleOpen}>Edit</Button>
        <Typography as="h1" className="text-4xl mt-3"> Profile Details </Typography>
        <Typography as="h1" className="text-2xl mt-3"> {user.name} </Typography>
        <Typography as="h1" className="text-2xl mt-3"> {user.email} </Typography>
        <Typography as="h1" className="text-2xl mt-3"> {user.role} </Typography>
        <Typography as="h1" className="text-2xl mt-3"> {user.department} </Typography>
        <Form open={uopen} handleOpen={uhandleOpen} type="profile" datas={user} update={update}/>
    </div>
  )
}

export default Profile