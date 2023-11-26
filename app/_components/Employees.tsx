import React, { useContext, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Form } from "./Form";
import { useDeleteEmployeeMutation } from "@app/_RTK_Query/authentication_query";
import { Context } from "@app/_helper/alertProvider";


export default function Employees({ employees: TABLE_ROWS }: { employees: any[] }) {
  const TABLE_HEAD = ["Name", "Email", "Department", "Role", "Actions"];
  const [deleteE] = useDeleteEmployeeMutation();
  const [copen, setCOpen] = useState(false);
  const [uopen, setUOpen] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const chandleOpen = () =>{
    setCOpen((v)=>!v)
  }
  const uhandleOpen = (datas?:any) =>{
    setData(datas);
    setUOpen((v)=>!v)
  }
  const { alertFun } = useContext(Context)!;


  const deleteEmployee = (url:string) => {
    deleteE(url).unwrap().then((res) => {
      alertFun('Deleted Successfully', "success");
  }).catch((error) => {
      alertFun(error?.data?.message, "error")
  })
  }

  return (
    <>
      <Card className="h-full w-full overflow-scroll">
        <div className="px-4">
          <Button color="green" onClick={chandleOpen}>Add Employee</Button>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, email, department, role, _id }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {department}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {role}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="div"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                    <Button color="blue" className="mr-2" onClick={()=>uhandleOpen({department,role, _id})}>Edit</Button>
                    <Button color="red" onClick={()=>deleteEmployee(`?id=${_id}`)}>Delete</Button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Form open={copen} handleOpen={chandleOpen} type="create" datas={data}/>
      <Form open={uopen} handleOpen={uhandleOpen} type="update" datas={data}/>
    </>
  );
}