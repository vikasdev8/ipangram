import DB from '@app/_config/database';
import deparment from '@app/_helper/department';
import HandleResponse from '@app/_helper/response';
import EmployeeModel from '@app/_model/employee.model';
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