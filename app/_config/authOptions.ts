import { NextAuthOptions, } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmplyeeModel from '@app/_model/employee.model';
import { NEXTAUTH_SECRET } from '@app/_config/const'
import DB from '@app/_config/database'

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "tradingDocs",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                DB()
                    const employee = await EmplyeeModel.findOne({ email: credentials?.email });
                if (!employee) {
                    throw new Error("Email or Password may be incorrect! pls again to login")
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