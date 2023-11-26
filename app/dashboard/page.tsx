"use client"

import Employees from '@app/_components/Employees';
import { StickyNavbar } from '@app/_components/Navbar';
import Profile from '@app/_components/Profile';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { IconButton, Button, Option } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGetAllEmployeesQuery } from '@app/_RTK_Query/authentication_query';
import { Pagination, Select } from 'antd';

export default function LogInForm() {
  const router = useRouter()
  const { status, data: session } = useSession();

  const users: any = session?.user;

  const [active, setActive] = React.useState(1);
  const [limit, setLimit] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const { isSuccess, isError, data } = useGetAllEmployeesQuery(`?limit=${limit}&page=${page}`,{refetchOnMountOrArgChange:true});

  const getItemProps = (index: number) =>
  ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => setPage(index),
  } as any);

  const next = () => {
    if (page === Math.ceil(data.totalEmployees / limit)) return;

    setPage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      console.log(data)
    }
    if (status === "unauthenticated") {
      router.push('/login')
    }
    console.log(session)
  }, [status,page,limit])
  return (
    <>
      <StickyNavbar />
      {
        (status === "authenticated" && isSuccess) ?
          (users.role === "manager" ?
            <>
              <Employees employees={data.data.employees} />
              <div className="flex items-center gap-4 justify-center">
                <div className="w-72 absolute left-2">
                  <Select onChange={(e)=>{
                    setLimit(Number(e))
                  }} value={limit}>
                    <Option value="10">10</Option>
                    <Option value="25">25</Option>
                    <Option value="50">50</Option>
                    <Option value="100">100</Option>
                  </Select>
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={prev}
                  disabled={page === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                  {
                    Array(Math.ceil(data.data.totalEmployees / limit)).fill("1").map((_: any, i: number) => {
                      return (
                        <IconButton {...getItemProps(i + 1)}>{i + 1}</IconButton>
                      )
                    })
                  }
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={next}
                  disabled={page === Math.ceil(data.data.totalEmployees / limit)}
                >
                  Next
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </>
            :
            <Profile />)
          :
          <h1>No Employees</h1>
      }
    </>
  );
}