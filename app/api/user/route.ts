import DB from '@app/_config/database';
import HandleResponse from '@app/_helper/response';
import EmployeeModel from '@app/_model/employee.model';
import { compareSync } from 'bcrypt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function PUT(req: NextRequest) {
    try {
        DB();

        const body = await req.json();
        console.log(body)
        const result = z.object({
            name: z.string(),
            email: z.string().email({ message: "Invalid email" }),
            password: z.string(),
            currentPassword: z.string(),
            _id: z.string()
        })
            .safeParse(body)

        if (!result.success) {
            return HandleResponse({
                type: "BAD_REQUEST",
                message: result.error.issues.map((v) => `${v.path[0]}: ${v.message}`).join('\n')
            })
        }
        const user = await EmployeeModel.findById({ _id: body._id }).select("+password")

        const { name, email, password, currentPassword } = body;
        if (password && currentPassword) {
            const compare = compareSync(currentPassword, user.password)

            if (!compare) {
                return HandleResponse({
                    type: "BAD_REQUEST",
                    message: "Current passowrd is not correct"
                })
            }
            password ? user['password'] = password : "";
        }
        name ? user['name'] = name : "";
        email ? user['email'] = email : "";
        user.save();

        return HandleResponse({
            type: "SUCCESS",
            message: "update successfully"
        })
    } catch (error: any) {
        return HandleResponse({
            type: "BAD_REQUEST",
            message: error?.message
        })
    }
}