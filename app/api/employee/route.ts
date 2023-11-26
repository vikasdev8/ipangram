import DB from '@app/_config/database';
import deparment from '@app/_helper/department';
import HandleResponse from '@app/_helper/response';
import EmployeeModel from '@app/_model/employee.model';
import { NextRequest } from 'next/server';
import { z } from 'zod';


export async function POST(req: Request) {
    try {
        DB();

        const body = await req.json();
        const result = z.object({
            name:z.string(),
            email:z.string().email({message:"Invalid email"}),
            role:z.enum(['manager', 'employee']),
            department:z.string(),
            password:z.string()
        })
        .required()
        .safeParse(body)
        
        console.log(result)
        if (!result.success) {
            return HandleResponse({
                type: "BAD_REQUEST",
                message: result.error.issues.map((v)=> `${v.path[0]}: ${v.message}`).join('\n')
            })
          }

        await EmployeeModel.create(body)

        return HandleResponse({
            type: "SUCCESS",
            message: "sign up successfully"
        })
    } catch (error:any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}
export async function GET(req: NextRequest) {
    try {
        DB();
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit');
        const page = searchParams.get('page');

        if(!(Number(page) >= 0 && Number(limit) >= 0)){
            return HandleResponse({
                type: "BAD_REQUEST",
                message: "something is wrong please reload you page and try again"
            })
        }
        const total = await EmployeeModel.countDocuments();
        const employees = total ? await EmployeeModel.find({}).skip((Number(page)-1)*Number(limit)).limit(Number(limit)).lean() : [];

        return HandleResponse({
            type: "SUCCESS",
            data: {
                employees,
                totalEmployees: total
            }
        })
    } catch (error:any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}
export async function PUT(req: Request) {
    try {
        DB();

        const body = await req.json();
        const result = z.object({
            name:z.string(),
            email:z.string().email({message:"Invalid email"}),
            role:z.enum(['manager', 'employee']),
            department:z.string(),
            password:z.string()
        })
        .required()
        .safeParse(body)
        
        console.log(result)
        if (!result.success) {
            return HandleResponse({
                type: "BAD_REQUEST",
                message: result.error.issues.map((v)=> `${v.path[0]}: ${v.message}`).join('\n')
            })
          }

        await EmployeeModel.create(body)

        return HandleResponse({
            type: "SUCCESS",
            message: "sign up successfully"
        })
    } catch (error:any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}
export async function DELETE(req: Request) {
    try {
        DB();

        const body = await req.json();
        const result = z.object({
            name:z.string(),
            email:z.string().email({message:"Invalid email"}),
            role:z.enum(['manager', 'employee']),
            department:z.string(),
            password:z.string()
        })
        .required()
        .safeParse(body)
        
        console.log(result)
        if (!result.success) {
            return HandleResponse({
                type: "BAD_REQUEST",
                message: result.error.issues.map((v)=> `${v.path[0]}: ${v.message}`).join('\n')
            })
          }

        await EmployeeModel.create(body)

        return HandleResponse({
            type: "SUCCESS",
            message: "sign up successfully"
        })
    } catch (error:any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}