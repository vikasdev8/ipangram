import { NextAuthOptions, } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmplyeeModel from '@app/_model/employee.model';
import { NEXTAUTH_SECRET } from '@app/_config/const'
import DB from '@app/_config/database'
import { compareSync } from "bcrypt";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "tradingDocs",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                DB()
                const result = z.object({
                    email: z.string().email({ message: "Invalid email" }),
                    password: z.string()
                })
                    .required()
                    .safeParse(credentials)

                if (!result.success) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }

                const employee = await EmplyeeModel.findOne({ email: credentials?.email }).select("password");

                if (!employee) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }

                const compare = compareSync(credentials?.password!, employee.password)

                if (!compare) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }

                return employee
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: NEXTAUTH_SECRET,
    }
}



export default authOptions