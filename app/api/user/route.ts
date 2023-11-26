import DB from '@app/_config/database';
import HandleResponse from '@app/_helper/response';
import EmployeeModel from '@app/_model/employee.model';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function PUT(req: NextRequest) {
    try {
        DB();

        const body = await req.json();
        const result = z.object({
            name:z.string(),
            email:z.string().email({message:"Invalid email"}),
            password:z.string(),
            newPassword:z.string(),
        })
        .required()
        .safeParse(body)
        
        if (!result.success) {
            return HandleResponse({
                type: "BAD_REQUEST",
                message: result.error.issues.map((v)=> `${v.path[0]}: ${v.message}`).join('\n')
            })
          }

        await EmployeeModel.findOneAndUpdate({email:body.email}, body)

        return HandleResponse({
            type: "SUCCESS",
            message: "update successfully"
        })
    } catch (error:any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}